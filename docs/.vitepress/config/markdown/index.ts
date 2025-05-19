import { type MarkdownRenderer } from 'vitepress';
import { demoContainer } from './demoContainer';

export const markdownPlugin = (md: MarkdownRenderer) => {
  md.use(demoContainer);
};
