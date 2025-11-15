import { Descendant, Editor } from 'slate-vue3/core';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    getInsertFragment: () => Descendant[];
  }
}

function isTransferCode(data: DataTransfer) {
  for (const type of data.types) {
    if (type === 'text/rtf' || type.includes('code') || type.includes('editor')) {
      return true;
    }
  }
}

function insertData(editor: Editor, data: DataTransfer) {
  if (editor.insertFragmentData(data)) {
    return true;
  }

  if (isTransferCode(data)) return;

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
