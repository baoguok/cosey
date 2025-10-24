import { useInheritRef, type RenderElementProps } from 'slate-vue3';
import { Editor, Transforms } from 'slate-vue3/core';
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
  Transforms.insertNodes(editor, image);
  Transforms.move(editor);
};

export function withImage(editor: Editor) {
  // is inline
  const isInline = editor.isInline;
  editor.isInline = (element) => {
    return element.type === 'image' ? true : isInline(element);
  };

  // is void
  const isVoid = editor.isVoid;
  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  // render element
  const renderElement = editor.renderElement;
  editor.renderElement = (props: RenderElementProps) => {
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
  const insertData = editor.insertData;
  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          insertImage(editor, '', file);
        }
      });
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
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
