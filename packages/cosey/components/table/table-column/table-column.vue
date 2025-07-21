<script lang="tsx">
import { computed, defineComponent } from 'vue';
import { type TableColumnProps, type TableColumnSlots, tableColumnProps } from './table-column';
import { isFunction, isPlainObject, isString } from '../../../utils';
import { mapRendererColumnProps, renderer } from './renderer';
import { ElTableColumn } from 'element-plus';
import classNames from 'classnames';

import useStyle from './style';
import { useComponentConfig } from '../../config-provider';
import { useLocale } from '../../../hooks';

const TableColumn = defineComponent({
  // 使用和ep一样的组件名
  // 是为了在多级表头中瞒骗ep以便和其他 ElTableColumn 一样添加到其子组件列表
  name: 'ElTableColumn',
  inheritAttrs: false,

  props: tableColumnProps,

  setup(props: TableColumnProps) {
    const { prefixCls } = useComponentConfig('table-column');

    const { t } = useLocale();

    const { hashId } = useStyle(prefixCls);

    const mergedProps = computed<TableColumnProps>(() => {
      const obj: TableColumnProps = {};
      const cls = [props.className, hashId.value, prefixCls.value];

      for (let [key, value] of Object.entries(props)) {
        if (value !== undefined) {
          (obj as any)[key] = value;
        }
      }

      if (!obj.formatter) {
        obj.formatter = (row, column, cellValue, index) => {
          return renderer({ cellValue, row, column, index }, obj.renderer, t);
        };

        const renderType = typeof obj.renderer === 'object' ? obj.renderer.type : obj.renderer!;

        const renderProps = mapRendererColumnProps[renderType];

        if (renderProps) {
          cls.push(renderProps.className);
          if (renderProps.minWidth && !obj.minWidth) {
            obj.minWidth = renderProps.minWidth;
          }
        }
      }

      obj.className = classNames(cls);

      return obj;
    });

    const slots = computed(() => {
      const result: TableColumnSlots = {};
      const slots = mergedProps.value.slots;
      if (isString(slots)) {
        result.default = props.internalSlot?.[slots];
      } else if (isPlainObject(slots)) {
        for (let [key, value] of Object.entries(slots)) {
          result[key as keyof TableColumnSlots] = isString(value)
            ? props.internalSlot?.[value]
            : value;
        }
      } else if (isFunction(slots)) {
        result.default = slots;
      }
      return result;
    });

    return () =>
      mergedProps.value.hidden ? null : (
        <ElTableColumn
          {...mergedProps.value}
          v-slots={{
            ...slots.value,
            default: (slotProps: any) =>
              mergedProps.value.columns
                ? mergedProps.value.columns.map((column) => <TableColumn {...column}></TableColumn>)
                : slots.value.default?.(slotProps),
          }}
        ></ElTableColumn>
      );
  },
});

export default TableColumn;
</script>
