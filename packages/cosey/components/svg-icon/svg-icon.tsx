import { computed, defineComponent } from 'vue';
import { svgIconProps } from './svg-icon.api';

export default defineComponent({
  name: 'CoSvgIcon',
  props: svgIconProps,
  setup(props) {
    const symbolId = computed(() => `#icon-${props.name}`);

    return () => {
      return (
        <svg aria-hidden="true">
          <use xlinkHref={symbolId.value} />
        </svg>
      );
    };
  },
});
