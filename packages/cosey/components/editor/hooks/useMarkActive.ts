import { useEditor } from 'slate-vue3';
import { Editor } from 'slate-vue3/core';
import { computed } from 'vue';

export function useMarkActive(mark: string) {
  const editor = useEditor();

  return computed(() => {
    const marks = Editor.marks(editor);
    return marks ? marks[mark as keyof typeof marks] === true : false;
  });
}
