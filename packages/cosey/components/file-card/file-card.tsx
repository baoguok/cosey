import Icon from '../icon/icon.vue';
import { fileCardProps, fileCardSlots } from './file-card.api';
import useStyle from './file-card.style';
import { useComponentConfig } from '../config-provider';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CoFileCard',
  props: fileCardProps,
  slots: fileCardSlots,
  setup(props) {
    const { prefixCls } = useComponentConfig('file-card', props);

    const { hashId } = useStyle(prefixCls);

    return () => {
      return (
        <div
          class={[hashId.value, prefixCls.value, `is-${props.size}`]}
          title={props.title || props.src}
        >
          <Icon name="co:document" />
          <div class={[`${prefixCls.value}-filename`]}>{props.name}</div>
        </div>
      );
    };
  },
});
