import 'prismjs';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-java';

import 'prismjs/themes/prism-okaidia.css';

import { type RenderElementProps, toRawWeakMap } from 'slate-vue3';
import { Editor, Element, Node, NodeEntry, Path, Range } from 'slate-vue3/core';
import { CodeBlockElement } from '../types';
import { h } from 'vue';
import { CodeBlock } from '../code-block';
import { DOMEditor } from 'slate-vue3/dom';
import { Hotkeys } from './keyboard';
import { isPointAtEndOfElement } from '../utils';

export const languageOptions = [
  { value: 'css', label: 'CSS' },
  { value: 'html', label: 'HTML' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'jsx', label: 'JSX' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'php', label: 'PHP' },
  { value: 'python', label: 'Python' },
  { value: 'sql', label: 'SQL' },
  { value: 'tsx', label: 'TSX' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'text', label: 'PlainText' },
];

declare module 'slate-vue3/core' {
  interface BaseEditor {
    decorate: (nodeList: Node[]) => Range[];
    formatCodeBlock: () => void;
  }
}

type PrismToken = Prism.Token;
type Token = {
  types: string[];
  content: string;
  empty?: boolean;
};

const newlineRe = /\r\n|\r|\n/;

// Empty lines need to contain a single empty token, denoted with { empty: true }
const normalizeEmptyLines = (line: Token[]) => {
  if (line.length === 0) {
    line.push({
      types: ['plain'],
      content: '\n',
      empty: true,
    });
  } else if (line.length === 1 && line[0].content === '') {
    line[0].content = '\n';
    line[0].empty = true;
  }
};

const appendTypes = (types: string[], add: string[] | string): string[] => {
  const typesSize = types.length;
  if (typesSize > 0 && types[typesSize - 1] === add) {
    return types;
  }

  return types.concat(add);
};

const normalizeTokens = (tokens: Array<PrismToken | string>): Token[][] => {
  const typeArrStack: string[][] = [[]];
  const tokenArrStack = [tokens];
  const tokenArrIndexStack = [0];
  const tokenArrSizeStack = [tokens.length];

  let i = 0;
  let stackIndex = 0;
  let currentLine: { types: string[]; content: string }[] = [];

  const acc = [currentLine];

  while (stackIndex > -1) {
    while ((i = tokenArrIndexStack[stackIndex]++) < tokenArrSizeStack[stackIndex]) {
      let content: any;
      let types = typeArrStack[stackIndex];

      const tokenArr = tokenArrStack[stackIndex];
      const token = tokenArr[i];

      // Determine content and append type to types if necessary
      if (typeof token === 'string') {
        types = stackIndex > 0 ? types : ['plain'];
        content = token;
      } else {
        types = appendTypes(types, token.type);
        if (token.alias) {
          types = appendTypes(types, token.alias);
        }

        content = token.content;
      }

      // If token.content is an array, increase the stack depth and repeat this while-loop
      if (typeof content !== 'string') {
        stackIndex++;
        typeArrStack.push(types);
        tokenArrStack.push(content);
        tokenArrIndexStack.push(0);
        tokenArrSizeStack.push(content.length);
        continue;
      }

      // Split by newlines
      const splitByNewlines = content.split(newlineRe);
      const newlineCount = splitByNewlines.length;

      currentLine.push({ types, content: splitByNewlines[0] });

      // Create a new line for each string on a new line
      for (let i = 1; i < newlineCount; i++) {
        normalizeEmptyLines(currentLine);
        acc.push((currentLine = []));
        currentLine.push({ types, content: splitByNewlines[i] });
      }
    }

    // Decreate the stack depth
    stackIndex--;
    typeArrStack.pop();
    tokenArrStack.pop();
    tokenArrIndexStack.pop();
    tokenArrSizeStack.pop();
  }

  normalizeEmptyLines(currentLine);
  return acc;
};

function node2Decorations(editor: Editor) {
  const decorationsMap = new toRawWeakMap<Node, Range[]>();
  const blockEntries = Editor.nodes(editor, {
    at: [],
    mode: 'highest',
    match: (n) => Element.isElement(n) && n.type === 'code-block',
  });

  Array.from(blockEntries).forEach(([block, blockPath]: NodeEntry<CodeBlockElement>) => {
    const text = block.children.map((line) => Node.string(line)).join('\n');
    const tokens = Prism.tokenize(text, Prism.languages[block.language]);
    // make tokens flat and grouped by line
    normalizeTokens(tokens).forEach((tokens, index) => {
      const element = block.children[index];

      if (!decorationsMap.has(element)) {
        decorationsMap.set(element, []);
      }

      let start = 0;
      tokens.forEach((token) => {
        const length = token.content.length;
        if (!length) {
          return;
        }
        const end = start + length;
        const path = [...blockPath, index, 0];
        const range: Range = {
          anchor: { path, offset: start },
          focus: { path, offset: end },
          token: true,
          ...Object.fromEntries(token.types.map((type) => [type, true])),
        };
        decorationsMap.get(element).push(range);
        start = end;
      });
    });
  });

  return decorationsMap;
}

function formatCodeBlock(editor: Editor) {
  editor.wrapNodes(
    { type: 'code-block', language: 'plain', children: [] },
    {
      match: (n) => Element.isElement(n) && n.type === 'paragraph',
      split: false,
    },
  );
  editor.setNodes(
    { type: 'code-line' as any },
    { match: (n) => Element.isElement(n) && n.type === 'paragraph' },
  );
}

export function withCodeBlock(editor: Editor) {
  const { renderElement, formatIndent, onKeydown } = editor;

  editor.decorate = (nodeList: Node[]) => {
    const node = nodeList[0];
    if (Element.isElement(node) && node.type === 'code-line') {
      return node2Decorations(editor).get(node);
    }
    return [];
  };

  editor.formatCodeBlock = () => {
    formatCodeBlock(editor);
  };

  editor.renderElement = (props: RenderElementProps) => {
    const { attributes: attrs, children, element } = props;

    if (element.type === 'code-block') {
      return h(CodeBlock, () => children);
    }
    if (element.type === 'code-line') {
      return h('div', { ...attrs, style: { position: 'relative' } }, children);
    }

    return renderElement(props);
  };

  editor.formatIndent = (value: number) => {
    DOMEditor.focus(editor);

    if (
      Array.from(
        Editor.nodes(editor, {
          match: (node) => Element.isElement(node) && node.type === 'code-block',
        }),
      ).length > 0
    ) {
      if (value === 1) {
        Editor.insertText(editor, '  ');
      }
      return;
    }

    return formatIndent(value);
  };

  editor.onKeydown = (event: KeyboardEvent) => {
    if (Hotkeys.isSoftBreak(event)) {
      if (
        isPointAtEndOfElement(editor, 'code-block', ([, path]) => {
          editor.insertNodes(
            {
              type: 'paragraph',
              children: [{ text: '' }],
            },
            {
              at: Path.next(path),
            },
          );
          editor.move();
        })
      ) {
        event.preventDefault();
        return;
      }
    }

    return onKeydown(event);
  };

  return editor;
}
