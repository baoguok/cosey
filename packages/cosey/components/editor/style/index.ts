import type { CSSInterpolation, CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';
import { getEditorToolbarStyle } from './toolbar';
import { getEditorButtonStyle } from './button';

export interface ComponentToken {}

export interface EditorToken extends FullToken<'Editor'> {}

const LIST_STYLE = ['decimal', 'lower-alpha', 'lower-roman'];
const LIST_STYLE_WIDTH = 1.2;
const LIST_STYLE_MARGIN = 0.3;
const LIST_STYLE_OUTER_WIDTH = LIST_STYLE_WIDTH + LIST_STYLE_MARGIN;
const MAX_INDENT = 9;

function resets(min: number, max: number) {
  return Array(max + 1 - min)
    .fill(0)
    .map((_, i) => `list-${i + min}`)
    .join(' ');
}

const getQuillClipboardStyle: GenerateStyle<EditorToken, CSSObject> = () => {
  return {
    '.ql-clipboard': {
      position: 'absolute',
      insetInlineStart: -100000,
      insetBlockStart: '50%',
      height: 1,
      overflowY: 'hidden',

      p: {
        margin: 0,
        padding: 0,
      },
    },
  };
};

const getIndent = () => {
  return {
    ...Array(MAX_INDENT)
      .fill(0)
      .map((_, i) => i + 1)
      .reduce((obj, num) => {
        return {
          ...obj,
          [`li[data-list=ordered].ql-indent-${num}`]: {
            counterIncrement: `list-${num}`,

            '> .ql-ui::before': {
              content: `counter(list-${num}, ${LIST_STYLE[num % 3]}) '. '`,
            },
          },
          ...(num < MAX_INDENT
            ? {
                [`li[data-list].ql-indent-${num}`]: {
                  '@supports (counter-set: none)': {
                    counterSet: resets(num + 1, MAX_INDENT),
                  },
                  '@supports not (counter-set: none)': {
                    counterReset: resets(num + 1, MAX_INDENT),
                  },
                },
              }
            : null),
        };
      }, {}),

    ...Array(MAX_INDENT)
      .fill(0)
      .map((_, i) => i + 1)
      .reduce((obj, num) => {
        return {
          ...obj,
          [`li.ql-indent-${num}`]: {
            paddingInlineStart: `${3 * num + LIST_STYLE_OUTER_WIDTH}em`,
          },
        };
      }, {}),
  };
};

export const getQuillArticleStyle: GenerateStyle<EditorToken, CSSObject> = (token) => {
  return {
    ...Array(MAX_INDENT)
      .fill(0)
      .map((_, i) => i + 1)
      .reduce((obj, num) => {
        return {
          ...obj,
          [`.ql-indent-${num}`]: {
            paddingInlineStart: `${3 * num}em`,
          },
        };
      }, {}),

    'p, ol, pre, blockquote, h1, h2, h3, h4, h5, h6': {
      margin: 0,
      padding: 0,
      marginBlockEnd: token.marginSM,
    },

    'h1, h2, h3, h4, h5, h6': {
      fontWeight: token.fontWeightStrong,
    },

    h1: {
      fontSize: token.fontSizeHeading1,
    },
    h2: {
      fontSize: token.fontSizeHeading2,
    },
    h3: {
      fontSize: token.fontSizeHeading3,
    },
    h4: {
      fontSize: token.fontSizeHeading4,
    },
    h5: {
      fontSize: token.fontSizeHeading5,
    },
    h6: {
      fontSize: token.fontSizeHeading6,
    },

    table: {
      borderCollapse: 'collapse',
      tableLayout: 'fixed',
      width: '100%',

      td: {
        outline: 'none',
        border: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
        paddingInline: token.paddingXS,
        paddingBlock: token.paddingXXS,
      },
    },

    ol: {
      paddingInlineStart: '1.5em',
    },

    a: {
      color: token.colorLink,
      textDecoration: token.linkDecoration,

      '&:hover': {
        color: token.colorLinkHover,
        textDecoration: token.linkHoverDecoration,
      },
      '&:active': {
        color: token.colorLinkActive,
      },
      '&:focus': {
        textDecoration: token.linkFocusDecoration,
      },
    },

    img: {
      display: 'inline-block',
      maxWidth: '100%',
    },

    blockquote: {
      borderInlineStart: `4px solid ${token.colorBorder}`,
      marginBlockEnd: 5,
      marginBlockStart: 5,
      paddingInlineStart: 16,
    },

    code: {
      fontSize: '85%',
      paddingBlock: 2,
      paddingInline: 4,
      borderRadius: token.borderRadiusSM,
      backgroundColor: '#f0f0f0',
    },

    kbd: {
      padding: `2px 6px`,
      fontSize: '.875em',
      color: token.colorText,
      backgroundColor: token.colorBgContainer,
      border: `${token.lineType} ${token.lineWidth} ${token.colorBorder}`,
      borderRadius: token.borderRadiusXS,
      boxShadow: `0 2px 0 -1px ${token.colorBgContainer}, 0 2px ${token.colorBorder}`,
    },
  };
};

const getQuillEditorStyle: GenerateStyle<EditorToken, CSSObject> = (token) => {
  return {
    '.ql-editor': {
      counterReset: resets(0, MAX_INDENT),
      lineHeight: token.lineHeight,
      height: '100%',
      outline: 'none',
      overflowY: 'auto',
      paddingBlock: token.paddingSM,
      paddingInline: token.padding,
      tabSize: 4,
      textAlign: 'left',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',

      ...getQuillArticleStyle(token),

      '> *': {
        cursor: 'text',
      },

      'p, h1, h2, h3, h4, h5, h6': {
        '@supports (counter-set: none)': {
          counterSet: resets(0, MAX_INDENT),
        },
        '@supports not (counter-set: none)': {
          counterReset: resets(0, MAX_INDENT),
        },
      },

      li: {
        position: 'relative',
        listStyleType: 'none',
        paddingInlineStart: token.padding,

        '> .ql-ui::before': {
          display: 'inline-block',
          marginInlineStart: `${-1 * LIST_STYLE_OUTER_WIDTH}em`,
          marginInlineEnd: `${LIST_STYLE_MARGIN}em`,
          textAlign: 'right',
          whiteSpace: 'nowrap',
          width: `${LIST_STYLE_WIDTH}em`,
        },
      },
      'li[data-list=bullet] > .ql-ui::before': {
        content: '"\\2022"',
      },
      'li[data-list]': {
        '@supports (counter-set: none)': {
          counterSet: resets(1, MAX_INDENT),
        },
        '@supports not (counter-set: none)': {
          counterReset: resets(1, MAX_INDENT),
        },
      },
      'li[data-list=ordered]': {
        counterIncrement: 'list-0',

        '> .ql-ui::before': {
          content: `counter(list-0, ${LIST_STYLE[0]}) '. '`,
        },
      },

      ...getIndent(),

      '.ql-ui': {
        position: 'absolute',
      },

      '&.ql-blank::before': {
        position: 'absolute',
        insetInlineStart: token.padding,
        insetInlineEnd: token.padding,
        color: token.colorTextPlaceholder,
        content: 'attr(data-placeholder)',
        fontStyle: 'italic',
        pointerEvents: 'none',
      },

      '.ql-code-block-container': {
        position: 'relative',
        marginBlockEnd: 5,
        marginBlockStart: 5,
        paddingBlock: 5,
        paddingInline: 10,
        overflow: 'visible',
        fontFamily: token.fontFamilyCode,
        color: '#f8f8f2',
        borderRadius: token.borderRadius,
        backgroundColor: '#23241f',

        '.ql-ui': {
          insetInlineEnd: 5,
          insetBlockStart: 5,
          color: token.colorText,
          backgroundColor: token.colorBgElevated,
          appearance: 'auto',
        },
      },
    },
  };
};

const getEditorStyle: GenerateStyle<EditorToken, CSSInterpolation> = (token) => {
  const { componentCls } = token;

  const toolbarCls = `${componentCls}-toolbar`;
  const containerCls = `${componentCls}-container`;

  return {
    [componentCls]: {
      position: 'relative',
      lineHeight: token.lineHeight,

      '*': {
        boxSizing: 'border-box',
      },

      [containerCls]: {
        position: 'relative',
        height: '100%',
        margin: 0,
        fontSize: token.fontSize,
        border: `1px solid ${token.colorBorder}`,
        borderRadius: token.borderRadius,
      },

      [`${toolbarCls} ~ ${containerCls}`]: {
        borderBlockStart: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      },

      '&.is-error': {
        [`${toolbarCls}, ${containerCls}`]: {
          borderColor: token.colorError,
        },
      },

      ...getQuillClipboardStyle(token),
      ...getQuillEditorStyle(token),
    },
  };
};

export default getStyleHook('Editor', (token) => {
  return [getEditorStyle(token), getEditorToolbarStyle(token), getEditorButtonStyle(token)];
});
