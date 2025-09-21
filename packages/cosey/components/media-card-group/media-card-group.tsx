import { mediaCardGroupProps, mediaCardGroupSlots } from './media-card-group.api';
import useStyle from './media-card-group.style';
import { useComponentConfig } from '../config-provider';
import { type MediaCardBaseProps } from '../media-card/media-card.api';
import MediaCard from '../media-card/media-card';
import { computed, defineComponent } from 'vue';
import { isString } from '../../utils';

export default defineComponent({
  name: 'CoMediaCardGroup',
  props: mediaCardGroupProps,
  slots: mediaCardGroupSlots,
  setup(props) {
    const { prefixCls } = useComponentConfig('media-card-group', props);

    const { hashId } = useStyle(prefixCls);

    const mergedSrcset = computed(() => {
      if (isString(props.srcset)) {
        return [
          {
            src: props.srcset,
          },
        ];
      }
      if (Array.isArray(props.srcset)) {
        return props.srcset.map((item) => {
          if (isString(item)) {
            return {
              src: item,
            };
          }
          return item as MediaCardBaseProps;
        });
      }
      return [];
    });

    const srcList = computed(() => mergedSrcset.value.map((item) => item.src!).filter(Boolean));

    return () => {
      return (
        <div class={[hashId.value, prefixCls.value]}>
          {mergedSrcset.value.map((item) => {
            return <MediaCard {...item} key={item.src} size={props.size} srcList={srcList.value} />;
          })}
        </div>
      );
    };
  },
});
