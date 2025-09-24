import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import plaintext from 'highlight.js/lib/languages/plaintext';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import less from 'highlight.js/lib/languages/less';
import { ExtractPropTypes, PropType, SlotsType } from 'vue';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('plaintext', plaintext);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('less', less);

export { hljs };

type xml =
  | 'xml'
  | 'html'
  | 'xhtml'
  | 'rss'
  | 'atom'
  | 'xjb'
  | 'xsd'
  | 'xsl'
  | 'plist'
  | 'wsf'
  | 'svg';
type json = 'json';
type js = 'javascript' | 'js' | 'jsx' | 'mjs' | 'cjs';
type ts = 'typescript' | 'ts' | 'tsx' | 'mts' | 'cts';
type plaintext = 'plaintext' | 'text' | 'txt';

export const highlightProps = {
  code: {
    type: String,
  },
  lang: {
    type: String as PropType<
      xml | json | js | ts | plaintext | 'css' | 'scss' | 'less' | (string & {})
    >,
  },
  maxHeight: {
    type: String,
  },
};

export type HighlightProps = ExtractPropTypes<typeof highlightProps>;

export interface HighlightSlots {
  default: {};
}

export const highlightSlots = Object as SlotsType<HighlightSlots>;

export interface HighlightEmits {}

export interface HighlightExpose {}
