import { type MarkdownRenderer } from 'vitepress';
import mdiContainer from 'markdown-it-container';
import fs from 'node:fs';
import path from 'node:path';

export function demoContainer(md: MarkdownRenderer) {
  mdiContainer(md, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/);
    },

    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);

      if (tokens[idx].nesting === 1) {
        const sourceFileToken = tokens[idx + 2];
        const sourceFile = sourceFileToken.children?.[0].content ?? '';
        let source = '';

        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(
            path.resolve(process.cwd(), 'docs/examples', `${sourceFile}.vue`),
            'utf-8',
          );
        }

        if (!source) {
          throw new Error(`Incorrect source file: ${sourceFile}`);
        }

        let code = md.render(`\`\`\` vue\n${source}\`\`\``);
        let description = md.render((m && m[1]) || '');

        source = encodeURIComponent(source);
        code = encodeURIComponent(code);
        description = encodeURIComponent(description);

        const displayComponentName = `examples-${sourceFile.replaceAll('/', '-')}`;

        return (
          `<component-demo source="${source}" code="${code}" description="${description}">` +
          `<template #display><${displayComponentName} /></template>`
        );
      } else {
        return `</component-demo>\n`;
      }
    },
  });
}
