import { defineComponent, h, inject, unref } from 'vue';

import type { PropType } from 'vue';
import { TABLE_INJECTION_KEY } from 'element-plus/es/components/table/src/tokens.mjs';
import { Store } from 'element-plus/es/components/table/src/store/index.mjs';
import { useNamespace } from 'element-plus';
import useLayoutObserver from 'element-plus/es/components/table/src/layout-observer.mjs';
import { Sort, SummaryMethod } from 'element-plus/es/components/index.mjs';
import { DefaultRow } from 'element-plus/es/components/table/src/table/defaults.mjs';
import useStyle from './style-helper';
import { defaultSummaryMethod } from './utils';

export interface TableFooter<T extends DefaultRow> {
  fixed: string;
  store: Store<T>;
  summaryMethod: SummaryMethod<T>;
  sumText: string;
  border: boolean;
  defaultSort: Sort;
}

export default defineComponent({
  name: 'ElTableFooter',

  props: {
    fixed: {
      type: String,
      default: '',
    },
    store: {
      required: true,
      type: Object as PropType<TableFooter<DefaultRow>['store']>,
    },
    summaryMethod: {
      type: Function as PropType<TableFooter<DefaultRow>['summaryMethod']>,
    },
    summaryProperties: {
      type: Array as PropType<string[]>,
    },
    transformSummary: {
      type: Function as PropType<(sums: any[]) => any[]>,
    },
    sumText: {
      type: String,
    },
    border: {
      type: Boolean,
    },
    defaultSort: {
      type: Object as PropType<TableFooter<DefaultRow>['defaultSort']>,
      default: () => {
        return {
          prop: '',
          order: '',
        };
      },
    },
  },
  setup(props) {
    const parent = inject(TABLE_INJECTION_KEY);
    const ns = useNamespace('table');
    const { getCellClasses, getCellStyles } = useStyle(props as TableFooter<DefaultRow>);
    const { onScrollableChange, onColumnsChange } = useLayoutObserver(parent!);

    return {
      ns,
      onScrollableChange,
      onColumnsChange,
      getCellClasses,
      getCellStyles,
      columns: parent!.store.states.columns,
    };
  },
  render() {
    const {
      columns,
      getCellStyles,
      getCellClasses,
      summaryMethod,
      sumText,
      summaryProperties,
      transformSummary,
    } = this;
    const data = unref(this.store.states.data) || [];

    let sums: any[] = [];
    if (summaryMethod) {
      sums = summaryMethod({
        columns,
        data,
      });
    } else {
      sums = defaultSummaryMethod(columns, data, sumText, summaryProperties, transformSummary);
    }

    if (!Array.isArray(sums[0])) {
      sums = [sums];
    }

    return h(
      h(
        'tfoot',
        sums.map((sum) => {
          return h('tr', {}, [
            ...columns.map((column, cellIndex) => {
              return h(
                'td',
                {
                  key: cellIndex,
                  class: getCellClasses(columns, cellIndex),
                  style: getCellStyles(column, cellIndex),
                },
                [
                  h(
                    'div',
                    {
                      class: ['cell', column.labelClassName],
                    },
                    [sum[cellIndex]],
                  ),
                ],
              );
            }),
          ]);
        }),
      ),
    );
  },
});
