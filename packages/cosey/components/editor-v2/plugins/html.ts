import { Editor } from 'slate-vue3/core';

function insertData(editor: Editor, data: DataTransfer) {
  const html = data.getData('text/html');

  if (html) {
    const fragment = editor.deserialize(html);
    editor.insertFragment(fragment);
    return true;
  }
}

export function withHtml(editor: Editor) {
  const { insertData: srcInsertData } = editor;

  editor.insertData = (data) => {
    if (!insertData(editor, data)) {
      srcInsertData(data);
    }
  };

  return editor;
}
