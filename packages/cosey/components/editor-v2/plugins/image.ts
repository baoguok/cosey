import { useInheritRef } from 'slate-vue3';
import { Editor } from 'slate-vue3/core';
import { h } from 'vue';
import { ImageComponent } from '../image-component';
import { isImageUrl } from '../../../utils';
import type { CustomEditor, ImageElement } from '../types';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    insertImage: (
      url: string,
      file?: File,
      width?: number | string,
      height?: number | string,
    ) => void;
  }
}

const insertImage = (
  editor: CustomEditor,
  url: string,
  file?: File,
  width?: number | string,
  height?: number | string,
) => {
  const image: ImageElement = { type: 'image', url, width, height, file, children: [{ text: '' }] };
  editor.insertNodes(image);
  editor.move();
};

function insertData(editor: Editor, data: DataTransfer) {
  const text = data.getData('text/plain');
  const { files } = data;

  if (files.length > 0) {
    Array.from(files).forEach((file) => {
      const [mime] = file.type.split('/');

      if (mime === 'image') {
        insertImage(editor, '', file);
      }
    });
    return true;
  } else if (isImageUrl(text)) {
    insertImage(editor, text);
    return true;
  }
}

export function withImage(editor: Editor) {
  const { isInline, isVoid, renderElement, insertData: srcInsertData } = editor;

  editor.isInline = (element) => {
    return element.type === 'image' ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.renderElement = (props) => {
    const { attributes, children, element } = props;

    if (element.type === 'image') {
      return h(
        ImageComponent,
        {
          ...useInheritRef(attributes),
          url: element.url,
          width: element.width,
          height: element.height,
          file: element.file,
        },
        () => children,
      );
    }

    return renderElement(props);
  };

  // insert data
  editor.insertData = (data) => {
    if (!insertData(editor, data)) {
      srcInsertData(data);
    }
  };

  // insert image
  editor.insertImage = (
    url: string,
    file?: File,
    width?: number | string,
    height?: number | string,
  ) => {
    insertImage(editor, url, file, width, height);
  };

  return editor;
}
