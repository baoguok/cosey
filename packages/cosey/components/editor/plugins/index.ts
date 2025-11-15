import { Editor } from 'slate-vue3/core';
import { withKeyboard } from './keyboard';
import { withList } from './list';
import { withHeading } from './heading';
import { withFont } from './font';
import { withColor } from './color';
import { withBackground } from './background';
import { withSize } from './size';
import { withIndent } from './indent';
import { withMark } from './mark';
import { withBlockQuote } from './block-quote';
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
import { withFormula } from './formula';

const plugins = [
  withKeyboard,
  withRender,
  withIndent,
  withHtml,
  withList,
  withHeading,
  withFont,
  withColor,
  withBackground,
  withSize,
  withMark,
  withBlockQuote,
  withAlign,
  withClear,
  withSerialize,
  withLink,
  withCodeBlock,
  withImage,
  withVideo,
  withTable,
  withFormula,
];

export function withDefaultPlugins(editor: Editor) {
  return plugins.reduce((editor, plugin) => plugin(editor), editor);
}
