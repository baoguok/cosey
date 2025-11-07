import { type Editor } from 'slate-vue3/core';
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
  editor.insertNodes(video);
  editor.move();
};

export function withVideo(editor: Editor) {
  const { isInline, isVoid, renderElement } = editor;

  editor.isInline = (element) => {
    return element.type === 'video' ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === 'video' ? true : isVoid(element);
  };

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

  editor.insertVideo = (url: string, width?: number | string, height?: number | string) => {
    insertVideo(editor, url, width, height);
  };

  return editor;
}
