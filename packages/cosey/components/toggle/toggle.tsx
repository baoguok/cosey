import { computed, defineComponent, ref, watch } from 'vue';
import { ElButton } from 'element-plus';
import { toggleProps, toggleSlots, toggleEmits } from './toggle.api';
import Icon from '../icon/icon.vue';
import { useLocale } from '../../hooks';

export default defineComponent({
  name: 'CoToggle',
  props: toggleProps,
  slots: toggleSlots,
  emits: toggleEmits,
  setup(props, { emit }) {
    const { t } = useLocale();

    const innerValue = ref(props.modelValue);

    watch(
      () => props.modelValue,
      () => {
        innerValue.value = props.modelValue;
      },
    );

    const text = computed(() => {
      return innerValue.value ? t('co.toggle.unfold') : t('co.toggle.fold');
    });

    const handleClick = () => {
      innerValue.value = !innerValue.value;
      emit('update:modelValue', innerValue.value);
    };

    return () => {
      return (
        <ElButton type="primary" link onClick={handleClick}>
          {text.value}
          <Icon name={innerValue.value ? 'co:chevron-down' : 'co:chevron-up'} size="xl" />
        </ElButton>
      );
    };
  },
});
