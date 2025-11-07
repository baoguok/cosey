import { ref, watch } from 'vue';
import { useEditor } from 'slate-vue3';
import { Element, Editor } from 'slate-vue3/core';

export function useBlockList(types: string[], initial?: string) {
  const editor = useEditor();

  const current = ref(initial);

  watch(
    () => editor.selection,
    () => {
      if (!editor.selection) {
        current.value = initial;
      } else {
        const [match] = Array.from(
          editor.nodes({
            at: Editor.unhangRange(editor, editor.selection),
            match: (n) => !Editor.isEditor(n) && Element.isElement(n) && types.includes(n.type),
          }),
        );

        current.value = (match && (match[0] as Element).type) || initial;
      }
    },
    {
      deep: true,
    },
  );

  return current;
}
