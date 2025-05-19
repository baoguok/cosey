import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import plaintext from 'highlight.js/lib/languages/plaintext';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import less from 'highlight.js/lib/languages/less';

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

export interface HighlightProps {
  code?: string;
  lang?: xml | json | js | ts | plaintext | 'css' | 'scss' | 'less';
}

export interface HighlightSlots {
  default?: (props: Record<string, never>) => any;
}

export interface HighlightEmits {}

export interface HighlightExpose {}
