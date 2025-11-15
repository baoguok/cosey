import { defineComponent, onMounted, reactive, ref, shallowRef, useTemplateRef } from 'vue';
import useStyle from './format-table.style';
import Picker from './picker';
import Button from '../button';
import Icon from '../../icon/icon';
import { useComponentConfig } from '../../config-provider';
import { useEditor } from 'slate-vue3';

export default defineComponent({
  name: 'CoEditorFormatTable',
  setup() {
    const { prefixCls } = useComponentConfig('editor-format-table');
    const { hashId } = useStyle(prefixCls);

    const editor = useEditor();

    const count = 10;

    const visible = ref(false);

    const buttonRef = useTemplateRef<{
      el: HTMLButtonElement;
    }>('button');

    const triggerTarget = shallowRef<HTMLElement | null>();

    const grid = reactive({
      row: 0,
      col: 0,
    });

    onMounted(() => {
      triggerTarget.value = buttonRef.value?.el;
    });

    const onBtnClick = () => {
      if (!visible.value) {
        grid.row = 0;
        grid.col = 0;
      }
      visible.value = !visible.value;
    };

    const onCellPointerOver = (row: number, col: number) => {
      grid.row = row;
      grid.col = col;
    };

    const onCellClick = (rowCount: number, columnCount: number) => {
      editor.insertTable(rowCount, columnCount);
      visible.value = false;
    };

    return () => {
      return (
        <Picker
          popperClass={[hashId.value, prefixCls.value]}
          v-model:visible={visible.value}
          trigger-target={triggerTarget.value}
          nopadding
          v-slots={{
            default: () => (
              <Button ref="button" onClick={onBtnClick}>
                <Icon name="co:table" />
              </Button>
            ),
            content: () => (
              <>
                <div class={`${prefixCls.value}-grid`}>
                  {Array(count)
                    .fill(0)
                    .map((_, row) => {
                      return (
                        <div key={row} class={`${prefixCls.value}-row`}>
                          {Array(count)
                            .fill(0)
                            .map((_, col) => {
                              return (
                                <div
                                  key={col}
                                  class={[
                                    `${prefixCls.value}-cell`,
                                    {
                                      'is-selected': col <= grid.col && row <= grid.row,
                                    },
                                  ]}
                                  onPointerover={() => onCellPointerOver(row, col)}
                                  onClick={() => onCellClick(row + 1, col + 1)}
                                ></div>
                              );
                            })}
                        </div>
                      );
                    })}
                </div>
                <div class={`${prefixCls.value}-count`}>{`${grid.col}x${grid.row}`}</div>
              </>
            ),
          }}
        ></Picker>
      );
    };
  },
});
