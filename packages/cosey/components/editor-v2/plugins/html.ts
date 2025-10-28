import { Editor } from 'slate-vue3/core';

export function withHtml(editor: Editor) {
  const insertData = editor.insertData;
  editor.insertData = (data) => {
    const html = data.getData('text/html');

    if (html) {
      const fragment = editor.deserialize(html);
      editor.insertFragment(fragment);
      return;
    }
    insertData(data);
  };

  return editor;
}
