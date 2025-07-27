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
        v-if="$slots['toolbar-left'] || $slots['toolbar-right'] || mergedToolbarConfig"
        :class="`${prefixCls}-toolbar`"
      >
        <div :class="`${prefixCls}-toolbar-left`">
          <slot name="toolbar-left"></slot>
        </div>
        <div :class="`${prefixCls}-toolbar-right`">
          <slot name="toolbar-right"></slot>
          <div v-if="mergedToolbarConfig" :class="`${prefixCls}-toolbar-preset`">
            <div v-if="mergedToolbarConfig.reload">
              <el-tooltip
                :content="t('co.common.reload')"
                placement="top"
                :show-after="200"
                :hide-after="0"
              >
                <el-button circle @click="reload">
                  <Icon
                    name="co:rotate-360"
                    size="md"
                    :class="[
                      `${prefixCls}-refresh-icon`,
                      {
                        'is-spinning': reloading,
                      },
                    ]"
                  />
                </el-button>
              </el-tooltip>
            </div>

            <div v-if="mergedToolbarConfig.export">
              <el-tooltip
                :content="t('co.table.export')"
                placement="top"
                :show-after="200"
                :hide-after="0"
              >
                <el-button circle @click="exportVisible = true">
                  <Icon name="co:download" size="md" />
                </el-button>
              </el-tooltip>

              <TableExport
                v-model="exportVisible"
                :title="t('co.table.exportData')"
                :config="mergedToolbarConfig.export"
                :columns="exportColumns"
                :data="tableDataWithSummary"
              />
            </div>

            <div v-if="mergedToolbarConfig.fullScreen">
              <el-tooltip
                :content="isFullPage ? t('co.table.exitFullScreen') : t('co.table.fullScreen')"
                placement="top"
                :show-after="200"
                :hide-after="0"
              >
                <el-button circle @click="onFullScreen">
                  <Icon :name="isFullPage ? 'co:fullscreen-exit' : 'co:fullscreen'" size="md" />
                </el-button>
              </el-tooltip>
            </div>

            <div v-if="mergedToolbarConfig.setting">
              <el-tooltip
                :content="t('co.table.columnSettings')"
                placement="top"
                :show-after="200"
                :hide-after="0"
              >
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
          ref="elTableRef"
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
import { computed, mergeProps, onMounted, ref, unref, useTemplateRef, watch } from 'vue';
import { reactiveComputed, reactiveOmit } from '@vueuse/core';
import {
  type TableInstance,
  type PaginationProps,
  type TableColumnCtx,
  ElButton,
  useZIndex,
} from 'element-plus';
import {
  type TableSlots,
  type TableExpose,
  type ToolbarConfig,
  tableProps,
  tableExposeKeys,
  elSlotsName,
  omittedTableProps,
  defaultTableConfig,
  tableEmitEvents,
  tableEmitOnEvents,
} from './table';
import { type TableColumnProps } from './table-column/table-column';
import TableColumn from './table-column/table-column.vue';
import TableColumnEditor from './table-column-editor/table-column-editor.vue';
import TableQuery from './table-query/table-query.vue';
import TableExport from './table-export/table-export.vue';
import Icon from '../icon/icon.vue';
import { useFetch, useFullPage } from '../../hooks';
import { filterEmptyFormValue } from './utils';
import {
  addPxUnit,
  createMergedExpose,
  flatColumns,
  getVNodeText,
  isFunction,
  isNullish,
  isObject,
  walkTree,
} from '../../utils';
import { useConfig, useComponentConfig } from '../config-provider';

import useStyle from './style';
import { useLocale } from '../../hooks';

defineOptions({
  name: 'Table',
});

const props = defineProps(tableProps);

const slots = defineSlots<TableSlots>();

const emit = defineEmits(tableEmitEvents);

const eventObject = tableEmitOnEvents.reduce(
  (obj, [name, onName]) => {
    obj[onName] = (...args: any[]) => {
      emit(name, ...args);
    };
    return obj;
  },
  {} as Record<string, (...args: any[]) => void>,
);

const { t } = useLocale();

const { prefixCls } = useComponentConfig('table');

const { hashId } = useStyle(prefixCls);

const { table: tableConfig } = useConfig();

const tableKeys = reactiveComputed(() => {
  return merge({}, defaultTableConfig.keys, unref(tableConfig)?.keys, props.keys);
});

const passedElSlotsName = computed(() => {
  return elSlotsName.filter((name) => !!slots[name as keyof TableSlots]);
});

const elTableRef = ref<TableInstance>();
const tableQueryRef = useTemplateRef('tableQuery');

// order
const mapOrderType = {
  ascending: tableKeys.asc,
  descending: tableKeys.desc,
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
        [tableKeys.orderBy]: prop,
        [tableKeys.orderType]: mapOrderType[order],
      }
    : null;

  page.value = 1;
  execute();
};

// props
const elTableProps = computed(() => {
  return mergeProps(
    reactiveOmit(props, omittedTableProps),
    {
      onSortChange,
    },
    eventObject,
  );
});

const containerStyle = computed(() => {
  return {
    height: addPxUnit(props.height),
  };
});

// columns
const renderedColumns = ref<TableColumnProps[]>([]);

const setRenderedColumns = () => {
  renderedColumns.value = cloneDeep(
    [...props.columns, props.actionColumn].filter(Boolean) as TableColumnProps[],
  );
};

const exportColumns = computed(() => {
  return renderedColumns.value?.filter((column) => {
    return (
      (!isNullish(column.prop) && column.prop !== '') ||
      (column.columns && column.columns.length > 0)
    );
  });
});

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

const tableDataWithSummary = computed(() => {
  const columns = flatColumns(props.columns);
  const data = [...tableData.value];

  if (props.summaryMethod) {
    const sum = props.summaryMethod({
      columns: columns as TableColumnCtx<any>[],
      data: tableData.value,
    });
    data.push(
      columns.reduce(
        (row, column, index) => {
          row[column.prop!] = getVNodeText(sum[index]);
          return row;
        },
        {} as Record<string, any>,
      ),
    );
  } else if (props.showSummary) {
    const sum = columns.map((column) => {
      const data = tableData.value.map((row) => +row[column.prop!]);
      if (data.some((num) => isNaN(num))) {
        return '';
      }
      return String(data.reduce((sum, num) => sum + num, 0));
    });
    sum[0] = props.sumText || t('co.table.total');
    data.push(
      columns.reduce(
        (row, column, index) => {
          row[column.prop!] = sum[index];
          return row;
        },
        {} as Record<string, any>,
      ),
    );
  }
  return data;
});

const getFetchParams = () => {
  const params = {
    ...orderParams,
    ...filterEmptyFormValue(tableQueryRef.value?.getFieldsValue() || {}),
  };

  return filterEmptyFormValue(props.beforeFetch?.(params) || params);
};

const getFullFetchParams = () => {
  return {
    [tableKeys.page]: page.value,
    [tableKeys.pageSize]: pageSize.value,
    ...getFetchParams(),
  };
};

const { isFetching, execute } = useFetch(() => props.api?.(getFullFetchParams()), {
  immediate: false,
  onSuccess(res) {
    res = props.afterFetch?.(res) || res;

    tableData.value = (tableKeys.list ? get(res, tableKeys.list) : res) || [];
    total.value = +get(res, tableKeys.total) || 0;

    elTableRef.value?.setScrollTop(0);
  },
  onFinally() {
    reloading.value = false;
  },
});

onMounted(() => {
  if (props.immediate) {
    execute();
  }
});

// pagination
const pagination = reactiveComputed(() => {
  return merge(
    {},
    defaultTableConfig.pagination,
    unref(tableConfig)?.pagination,
    isObject(props.pagination) ? props.pagination : null,
  );
});

const total = ref(0);
const page = ref<number>(pagination.currentPage);
const pageSize = ref<number>(pagination.pageSize);

const paginationProps = computed<Partial<PaginationProps> | false>(() => {
  if (props.pagination === false) {
    return false;
  }
  return {
    ...pagination,
    total: total.value,
  };
});

const onPageSizeChange = () => {
  page.value = 1;
};

const onPageChange = () => {
  execute();
};

// toolbar config
const defaultToolbarConfig = {
  reload: true,
  export: true,
  fullScreen: true,
  setting: true,
};

const mergedToolbarConfig = computed<false | ToolbarConfig>(() => {
  if (!props.toolbarConfig) {
    return false;
  }
  if (props.toolbarConfig === true) {
    return defaultToolbarConfig;
  }
  return {
    ...defaultToolbarConfig,
    ...props.toolbarConfig,
  };
});

// reload
const reloading = ref(false);

const reload = () => {
  if (!isFetching.value) {
    reloading.value = true;
    execute();
  }
};

// expand
const innerExpandRowKeys = ref<(string | number)[]>();

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
    getFetchParams,
    getFullFetchParams,
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
