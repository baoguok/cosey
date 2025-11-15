import { computed, defineComponent } from 'vue';
import { iconifyIconProps, iconifyIconsSets } from './iconify-icon.api';

export default defineComponent({
  name: 'CoIconifyIcon',
  props: iconifyIconProps,
  setup(props) {
    const iconSet = computed(() => iconifyIconsSets[props.prefix]);

    const viewBox = computed(
      () => `0 0 ${iconSet.value?.width ?? 16} ${iconSet.value?.height ?? 16}`,
    );

    const path = computed(() => {
      const icon = iconSet.value?.icons[props.name!];
      return icon?.body;
    });

    return () => {
      return <svg viewBox={viewBox.value} aria-hidden="true" v-html={path.value}></svg>;
    };
  },
});
