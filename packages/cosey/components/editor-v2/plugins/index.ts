import { Editor } from 'slate-vue3/core';
import { withNormalizeNode } from './normalize-node';
import { withKeyboard } from './keyboard';
import { withList } from './list';
import { withHeading } from './heading';
import { withFont } from './font';
import { withColor } from './color';
import { withBackground } from './background';
import { withSize } from './size';
import { withIndent } from './indent';
import { withMark } from './mark';
import { withBlock } from './block';
import { withAlign } from './align';
import { withClear } from './clear';
import { withSerialize } from './serialize';
import { withRender } from './render';
import { withLink } from './link';
import { withCodeBlock } from './code-block';
import { withImage } from './image';
import { withVideo } from './video';
import { withHtml } from './html';
import { withTable } from './table';

const plugins = [
  withKeyboard,
  withRender,
  withNormalizeNode,
  withHtml,
  withList,
  withHeading,
  withFont,
  withColor,
  withBackground,
  withSize,
  withIndent,
  withMark,
  withBlock,
  withAlign,
  withClear,
  withSerialize,
  withLink,
  withCodeBlock,
  withImage,
  withVideo,
  withTable,
];

export function withDefaultPlugins(editor: Editor) {
  return plugins.reduce((editor, plugin) => plugin(editor), editor);
}
