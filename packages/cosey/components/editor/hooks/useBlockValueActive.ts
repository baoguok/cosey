import { useEditor } from 'slate-vue3';
import { Element, Editor } from 'slate-vue3/core';
import { computed } from 'vue';

export function useBlockValueActive(key: string, value: string) {
  const editor = useEditor();

  return computed(() => {
    if (!editor.selection) return false;
    const [match] = Array.from(
      editor.nodes({
        at: Editor.unhangRange(editor, editor.selection),
        match: (n) => {
          return !Editor.isEditor(n) && Element.isElement(n) && n[key as keyof typeof n] === value;
        },
      }),
    );

    return !!match;
  });
}
