import { computed, defineComponent, ref } from 'vue';
import Picker from './picker';
import { useComponentConfig } from '../../config-provider';
import useStyle from './color-picker.style';
import { colorNames, colorPalettes } from './color-picker.api';
import Icon from '../../icon/icon';
import { ElInput } from 'element-plus';
import { TinyColor } from '@ctrl/tinycolor';
import { useHistoryColor } from '../hooks/useHistoryColor';
import { isBoolean, isString } from '../../../utils';

export default defineComponent({
  props: {
    visible: { type: Boolean },
  },
  emits: {
    'update:visible': (visible: boolean) => isBoolean(visible),
    select: (color: string) => isString(color),
    clear: () => true,
  },
  setup(props, { slots, emit }) {
    const { prefixCls } = useComponentConfig('editor-v2-color-picker');
    const { hashId } = useStyle(prefixCls);

    const innerVisible = computed({
      get() {
        return props.visible;
      },
      set(visible: boolean) {
        emit('update:visible', visible);
      },
    });

    const inputColor = ref('');

    const { historyColors, pushHistory } = useHistoryColor();

    const mapHistoryColors = computed(() => {
      return Array(colorNames.length)
        .fill(0)
        .map((_, i) => {
          return historyColors.value[i] || '';
        });
    });

    const normalInputColor = computed(() => new TinyColor(inputColor.value).toHexString());

    const isEyeDropperSupported = computed(() => typeof (window as any).EyeDropper === 'function');

    const select = (color: string) => {
      pushHistory(color);
      emit('select', color);
      emit('update:visible', false);
    };

    const onSelect = (color: string) => {
      if (color) {
        select(color);
      }
    };

    const onCustomSelect = () => {
      select(normalInputColor.value);
    };

    const onClear = () => {
      emit('clear');
      emit('update:visible', false);
    };

    const onAbsorb = () => {
      const eyeDropper = new (window as any).EyeDropper();
      eyeDropper.open().then((result: any) => {
        inputColor.value = result.sRGBHex;
      });
    };

    return () => {
      return (
        <Picker
          popperClass={[hashId.value, prefixCls.value]}
          v-model:visible={innerVisible.value}
          v-slots={{
            default: slots.default,
            content: () => (
              <>
                <div class={`${prefixCls.value}-title`}>预设</div>
                <div class={`${prefixCls.value}-preset`}>
                  {colorPalettes.map((row, i) => (
                    <div key={i} class={`${prefixCls.value}-row`}>
                      {row.map((color, j) => (
                        <div key={j} class={`${prefixCls.value}-item`}>
                          <button
                            type="button"
                            class={[`${prefixCls.value}-color`, `${prefixCls.value}-btn`]}
                            style={{ background: color }}
                            onClick={() => onSelect(color)}
                          ></button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div class={`${prefixCls.value}-title`}>最近使用</div>
                <div class={`${prefixCls.value}-row`}>
                  {mapHistoryColors.value.map((color, i) => (
                    <div key={i} class={`${prefixCls.value}-item`}>
                      <button
                        type="button"
                        class={[
                          `${prefixCls.value}-color`,
                          `${prefixCls.value}-btn`,
                          {
                            'is-empty': !color,
                          },
                        ]}
                        style={{ background: color }}
                        onClick={() => onSelect(color)}
                      ></button>
                    </div>
                  ))}
                </div>

                <div class={`${prefixCls.value}-title`}>手动设置</div>
                <div class={`${prefixCls.value}-manual`}>
                  {isEyeDropperSupported.value && (
                    <button type="button" class={[`${prefixCls.value}-btn`]} onClick={onAbsorb}>
                      <Icon name="co:eyedropper" size="lg" />
                    </button>
                  )}
                  <ElInput
                    v-model={inputColor.value}
                    size="small"
                    placeholder="请输入"
                    class={[`${prefixCls.value}-input`]}
                  />
                  <button
                    type="button"
                    class={[`${prefixCls.value}-color`, `${prefixCls.value}-btn`]}
                    style={{ backgroundColor: normalInputColor.value }}
                    onClick={onCustomSelect}
                  ></button>
                  <button
                    type="button"
                    class={[
                      `${prefixCls.value}-color`,
                      `${prefixCls.value}-btn`,
                      `${prefixCls.value}-clear`,
                    ]}
                    onClick={onClear}
                  >
                    <Icon name="co:slash-forward" size="lg" />
                  </button>
                </div>
              </>
            ),
          }}
        ></Picker>
      );
    };
  },
});
