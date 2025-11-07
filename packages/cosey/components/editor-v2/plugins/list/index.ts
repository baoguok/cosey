import { Editor, Element, Path, Range } from 'slate-vue3/core';
import { DOMEditor } from 'slate-vue3/dom';
import { ListItemElement, ListType, ParagraphElement } from '../../types';
import { getItemDepth, isList, isListItem } from './utils';
import { mergeSiblingNode } from '../../utils';

export * from './utils';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatList: (value: ListType) => void;
  }
}

const listItemReplaceable = [
  'block',
  'paragraph',
  'block-quote',
  'heading-one',
  'heading-two',
  'heading-three',
  'heading-four',
  'heading-five',
  'heading-six',
];

function findConsecutiveListItems(editor: Editor) {
  const groups = [];
  let currentGroup: {
    node: ListItemElement;
    path: Path;
  }[] = [];

  // 获取选区内的所有节点
  const nodes = Array.from(
    editor.nodes({
      match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
    }),
  );

  nodes.forEach(([node, path]) => {
    if (isListItem(node)) {
      currentGroup.push({ node, path });
    } else {
      if (currentGroup.length > 0) {
        groups.push([...currentGroup]);
        currentGroup = [];
      }
    }
  });

  // 添加最后一个组
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
}

function getRangeBetweenPaths(editor: Editor, path1: Path, path2: Path): Range {
  return {
    anchor: editor.start(path1),
    focus: editor.end(path2),
  };
}

function wrapListItems(editor: Editor, type: ListType) {
  const [match] = editor.nodes({
    match: isListItem,
  });

  if (!match) return;

  const liGroups = findConsecutiveListItems(editor);

  // 对每个连续的 li 组分别包裹(倒序)
  for (let i = liGroups.length - 1; i >= 0; i--) {
    const group = liGroups[i];

    if (group.length > 0) {
      editor.wrapNodes(
        {
          type,
          children: [],
        },
        {
          at: getRangeBetweenPaths(editor, group[0].path, group[group.length - 1].path),
          match: isListItem,
          mode: 'lowest',
          voids: false,
        },
      );
    }
  }
}

function mergeListSiblings(editor: Editor) {
  const paths = [
    ...editor.nodes({
      match: isList,
    }),
  ].map((item) => item[1]);

  for (let i = paths.length - 1; i >= 0; i--) {
    const path = paths[i];
    mergeSiblingNode(editor, path);
  }
}

function formatIndent(editor: Editor, value: number) {
  const listItemNodes = Array.from(
    editor.nodes({
      match: isListItem,
    }),
  );

  if (listItemNodes.length > 0) {
    // todo
    void value;
    return true;
  }
}

export function withList(editor: Editor) {
  const { insertBreak, renderElement, formatIndent: srcFormatIndent } = editor;

  editor.renderElement = (props) => {
    return renderElement(props);
  };

  editor.formatIndent = (value: number) => {
    formatIndent(editor, value);
    srcFormatIndent(value);
  };

  editor.insertBreak = () => {
    const [match] = editor.nodes({
      match: isListItem,
      mode: 'lowest',
    });

    if (match) {
      const [node, path] = match;
      if (Editor.isEmpty(editor, node) && getItemDepth(editor, path) === 0) {
        editor.liftNodes({
          at: path,
          mode: 'lowest',
        });
        editor.setNodes({ type: 'paragraph' });
        return;
      }
    }

    insertBreak();
  };

  /*
  规则：
  - 选区包含任意列表时，移除所有选中的列表
  - 只能格式化指定块级元素
  - 可分段式格式化
  - 同级的列表会合并
  */
  editor.formatList = (value: ListType) => {
    DOMEditor.focus(editor);

    if (!editor.selection) return false;

    const [match] = Array.from(
      editor.nodes({
        at: Editor.unhangRange(editor, editor.selection),
        match: isList,
      }),
    );

    const isActive = !!match;

    if (isActive) {
      editor.unwrapNodes({
        match: isList,
        split: true,
      });
      editor.setNodes<ParagraphElement>(
        {
          type: 'paragraph',
        },
        {
          match: isListItem,
        },
      );
    } else {
      editor.setNodes(
        {
          type: 'list-item',
        },
        {
          match: (n) => Element.isElement(n) && listItemReplaceable.includes(n.type),
        },
      );
      wrapListItems(editor, value);

      mergeListSiblings(editor);
    }
  };

  return editor;
}
