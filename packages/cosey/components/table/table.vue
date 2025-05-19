<template>
  <div
    v-loading="isFetching"
    :class="[
      hashId,
      prefixCls,
      {
        'is-fullpage': isFullPage,
      },
    ]"
    :style="{ ...containerStyle, zIndex }"
  >
    <div v-if="formProps" :class="`${prefixCls}-header`">
      <TableQuery ref="tableQuery" v-bind="formProps" :reset="onReset" :submit="onSubmit" />
    </div>

    <div :class="`${prefixCls}-body`">
      <div
        v-if="$slots['toolbar-left'] || $slots['toolbar-right'] || toolbarConfig"
        :class="`${prefixCls}-toolbar`"
      >
        <div :class="`${prefixCls}-toolbar-left`">
          <slot name="toolbar-left"></slot>
        </div>
        <div :class="`${prefixCls}-toolbar-right`">
          <slot name="toolbar-right"></slot>
          <div v-if="toolbarConfig" :class="`${prefixCls}-toolbar-preset`">
            <div v-if="toolbarConfig.reload">
              <el-tooltip content="刷新" placement="top" :show-after="200" :hide-after="0">
                <el-button circle>
                  <Icon
                    name="co:rotate-360"
                    size="md"
                    :class="[
                      `${prefixCls}-refresh-icon`,
                      {
                        'is-spinning': reloading,
                      },
                    ]"
                    @click="reload"
                  />
                </el-button>
              </el-tooltip>
            </div>

            <div v-if="toolbarConfig.export">
              <el-tooltip content="导出" placement="top" :show-after="200" :hide-after="0">
                <el-button circle @click="exportVisible = true">
                  <Icon name="co:download" size="md" />
                </el-button>
              </el-tooltip>

              <TableExport
                v-model="exportVisible"
                title="导出数据"
                :columns="renderedColumns"
                :data="tableData"
              />
            </div>

            <div v-if="toolbarConfig.fullScreen">
              <el-tooltip
                :content="isFullPage ? '退出全屏' : '全屏'"
                placement="top"
                :show-after="200"
                :hide-after="0"
              >
                <el-button circle @click="onFullScreen">
                  <Icon :name="isFullPage ? 'co:fullscreen-exit' : 'co:fullscreen'" size="md" />
                </el-button>
              </el-tooltip>
            </div>

            <div v-if="toolbarConfig.setting">
              <el-tooltip content="列设置" placement="top" :show-after="200" :hide-after="0">
                <el-button ref="setting-ref" circle>
                  <Icon name="co:settings-adjust" size="md" />
                </el-button>
              </el-tooltip>

              <TableColumnEditor
                v-model="renderedColumns"
                :virtual-ref="settingRef"
                @reset="onColumnReset"
              />
            </div>
          </div>
        </div>
      </div>

      <div :class="`${prefixCls}-table`">
        <el-table
          ref="table"
          v-bind="elTableProps"
          :data="tableData"
          :expand-row-keys="innerExpandRowKeys"
          style="width: 100%"
          height="100%"
          max-height="none"
        >
          <template v-for="column of renderedColumns" :key="column.prop">
            <TableColumn v-bind="column" :internal-slot="$slots" />
          </template>
          <template v-for="name of passedElSlotsName" :key="name" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps"></slot>
          </template>
        </el-table>
      </div>

      <el-pagination
        v-if="paginationProps"
        v-bind="paginationProps"
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :class="`${prefixCls}-pagination`"
        style="
          --el-pagination-bg-color: transparent;
          --el-pagination-button-disabled-bg-color: transparent;
        "
        @size-change="onPageSizeChange"
        @change="onPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep, get, merge } from 'lodash-es';
import { computed, mergeProps, ref, useTemplateRef, watch } from 'vue';
import {
  type TableSlots,
  type TableEmits,
  type TableExpose,
  defaultPaginationProps,
  tableProps,
  tableExposeKeys,
  elSlotsName,
  omittedTableProps,
  defaultTableConfig,
} from './table';
import { type TableInstance, type PaginationProps, ElButton } from 'element-plus';
import { type TableColumnProps } from './table-column/table-column';
import TableColumn from './table-column/table-column.vue';
import TableColumnEditor from './table-column-editor/table-column-editor.vue';
import TableQuery from './table-query/table-query.vue';
import TableExport from './table-export/table-export.vue';
import Icon from '../icon/icon.vue';
import { reactiveOmit } from '@vueuse/core';
import { useFetch, useFullPage } from '../../hooks';
import { filterEmptyFormValue } from './utils';
import { addPxUnit, createMergedExpose, isFunction, walkTree } from '../../utils';
import { useConfig } from '../config-provider';
import { useZIndex } from 'element-plus';

import useStyle from './style';
import { useComponentConfig } from '../config-provider';

defineOptions({
  name: 'Table',
});

const props = defineProps(tableProps);

const slots = defineSlots<TableSlots>();

const { prefixCls } = useComponentConfig('table');

const { hashId } = useStyle(prefixCls);

const config = useConfig();

const tableKeys = computed(() => {
  return merge({}, defaultTableConfig.keys, config.table?.keys, props.keys);
});

const passedElSlotsName = computed(() => {
  return elSlotsName.filter((name) => !!slots[name as keyof TableSlots]);
});

defineEmits<TableEmits>();

const elTableRef = useTemplateRef<TableInstance>('table');
const tableQueryRef = useTemplateRef('tableQuery');

// order
const mapOrderType = {
  ascending: tableKeys.value.asc,
  descending: tableKeys.value.desc,
};

let orderParams: {
  [x: string]: string;
} | null = null;

const onSortChange = ({
  prop,
  order,
}: {
  prop: string;
  order: 'ascending' | 'descending' | null;
}) => {
  orderParams = order
    ? {
        [tableKeys.value.orderBy]: prop,
        [tableKeys.value.orderType]: mapOrderType[order],
      }
    : null;

  page.value = 1;
  execute();
};

// props
const elTableProps = computed(() => {
  return mergeProps(reactiveOmit(props, omittedTableProps), {
    onSortChange,
  });
});

const containerStyle = computed(() => {
  return {
    height: addPxUnit(props.height),
  };
});

// columns
const renderedColumns = ref<TableColumnProps[]>();

const setRenderedColumns = () => {
  renderedColumns.value = cloneDeep(
    [...props.columns, props.actionColumn].filter(Boolean) as TableColumnProps[],
  );
};

watch(
  [() => props.columns, () => props.actionColumn],
  () => {
    setRenderedColumns();
  },
  {
    immediate: true,
  },
);

const onColumnReset = () => {
  setRenderedColumns();
};

// data
const tableData = ref(props.data || []);

const { isFetching, execute } = useFetch(
  () => {
    let params = {
      [tableKeys.value.page]: page.value,
      [tableKeys.value.pageSize]: pageSize.value,
      ...orderParams,
      ...filterEmptyFormValue(tableQueryRef.value?.getFieldsValue() || {}),
    };

    params = props.beforeFetch?.(params) || params;

    return props.api?.(params);
  },
  {
    immediate: props.immediate,
    onSuccess(res) {
      res = props.afterFetch?.(res) || res;

      tableData.value = (tableKeys.value.list ? get(res, tableKeys.value.list) : res) || [];
      total.value = get(res, tableKeys.value.total) || 0;

      elTableRef.value?.setScrollTop(0);
    },
    onFinally() {
      reloading.value = false;
    },
  },
);

// pagination
const total = ref(0);
const page = ref<number>(1);
const pageSize = ref<number>(10);

const paginationProps = computed<Partial<PaginationProps> | false>(() => {
  if (props.pagination === false) {
    return false;
  }
  return {
    ...defaultPaginationProps,
    ...(typeof props.pagination === 'object' ? props.pagination : null),
    total: total.value,
  };
});

const onPageSizeChange = () => {
  page.value = 1;
};

const onPageChange = () => {
  execute();
};

// reload
const reloading = ref(false);

const reload = () => {
  if (!isFetching.value) {
    reloading.value = true;
    execute();
  }
};

// expand
const innerExpandRowKeys = ref<string[]>();

watch(
  () => props.expandRowKeys,
  () => {
    if (props.expandRowKeys) {
      innerExpandRowKeys.value = props.expandRowKeys;
    }
  },
  {
    immediate: true,
  },
);

const expandAll = () => {
  const ids: string[] = [];
  walkTree(tableData.value, 'children', (node) => {
    if (props.rowKey) {
      const key = isFunction(props.rowKey) ? props.rowKey(node) : props.rowKey;
      const id = get(node, key);
      ids.push(String(id));
    }
  });
  innerExpandRowKeys.value = ids;
};

const collapseAll = () => {
  innerExpandRowKeys.value = [];
};

// export
const exportVisible = ref(false);

// full page
const { nextZIndex } = useZIndex();

const { isFullPage, toggle } = useFullPage({
  fullscreen: true,
});

const zIndex = ref<number>();

const onFullScreen = () => {
  toggle();

  zIndex.value = isFullPage.value ? nextZIndex() : undefined;
};

// setting
const settingRef = useTemplateRef('setting-ref');

// form query
const onSubmit = async () => {
  if (!isFetching.value) {
    page.value = 1;
    await execute();
  }
};

const onReset = async () => {
  if (!isFetching.value) {
    page.value = 1;
    await execute();
  }
};

// expose
const expose = createMergedExpose(
  tableExposeKeys,
  () => elTableRef.value,
  {
    reload,
    expandAll,
    collapseAll,
  },
  () => tableQueryRef.value,
);

watch(
  () => props.getExpose,
  () => {
    props.getExpose?.(expose);
  },
  {
    immediate: true,
  },
);

defineExpose<TableExpose>(expose);
</script>
