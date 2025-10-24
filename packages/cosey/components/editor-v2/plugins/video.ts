import { Transforms, type Editor } from 'slate-vue3/core';
import { h } from 'vue';
import { VideoComponent } from '../video-component';
import { useInheritRef } from 'slate-vue3';
import { CustomEditor, VideoElement } from '../types';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    insertVideo: (url: string, width?: number | string, height?: number | string) => void;
  }
}

const insertVideo = (
  editor: CustomEditor,
  url: string,
  width?: number | string,
  height?: number | string,
) => {
  const video: VideoElement = { type: 'video', url, width, height, children: [{ text: '' }] };
  Transforms.insertNodes(editor, video);
  Transforms.move(editor);
};

export function withVideo(editor: Editor) {
  // is inline
  const isInline = editor.isInline;
  editor.isInline = (element) => {
    return element.type === 'video' ? true : isInline(element);
  };

  // is void
  const isVoid = editor.isVoid;
  editor.isVoid = (element) => {
    return element.type === 'video' ? true : isVoid(element);
  };

  // render element
  const renderElement = editor.renderElement;
  editor.renderElement = (props) => {
    const { attributes, children, element } = props;

    if (element.type === 'video') {
      return h(
        VideoComponent,
        {
          ...useInheritRef(attributes),
          url: element.url,
          width: element.width,
          height: element.height,
        },
        () => children,
      );
    }

    return renderElement(props);
  };

  // insert video
  editor.insertVideo = (url: string, width?: number | string, height?: number | string) => {
    insertVideo(editor, url, width, height);
  };

  return editor;
}
