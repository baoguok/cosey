import { computed, defineComponent } from 'vue';
import { useEditor } from 'slate-vue3';
import { useToken } from '../theme';
import Select from './select';
import { HEADING_TYPES, type HeadingParagraphType } from './types';

export default defineComponent({
  setup() {
    const { token } = useToken();

    const list = computed(() => {
      const headingList = HEADING_TYPES.map((item, i) => {
        const n = (i + 1) as 1 | 2 | 3 | 4 | 5 | 6;
        return {
          label: `标题 ${n}`,
          value: item,
          style: {
            fontSize: token.value[`fontSizeHeading${n}`] + 'px',
            lineHeight: token.value[`lineHeightHeading${n}`],
            fontWeight: token.value['fontWeightStrong'],
          },
        };
      });

      return [
        {
          label: '正文',
          value: 'paragraph',
          style: {
            lineHeight: token.value['lineHeight'],
            fontSize: token.value['fontSize'] + 'px',
          },
        },
        ...headingList,
      ];
    });

    const editor = useEditor();

    const activeType = computed(() => editor.getActiveHeadingType());

    const onChange = (value: HeadingParagraphType) => {
      editor.formatHeading(value);
    };

    return () => {
      return (
        <Select
          v-model={activeType.value}
          list={list.value}
          button-width="100px"
          onChange={onChange}
        ></Select>
      );
    };
  },
});
