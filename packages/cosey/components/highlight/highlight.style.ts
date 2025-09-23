import { CSSObject } from '../cssinjs';
import { getSimpleStyleHook } from '../theme';

export function getHljs(): CSSObject {
  return {
    '.hljs': {
      color: '#abb2bf',
      background: '#282c34',
    },

    '.hljs-comment,.hljs-quote': {
      color: '#5c6370',
      fontStyle: 'italic',
    },

    '.hljs-doctag,.hljs-keyword,.hljs-formula': {
      color: '#c678dd',
    },

    '.hljs-section,.hljs-name,.hljs-selector-tag,.hljs-deletion,.hljs-subst': {
      color: '#e06c75',
    },

    '.hljs-literal': {
      color: '#56b6c2',
    },

    '.hljs-string,.hljs-regexp,.hljs-addition,.hljs-attribute,.hljs-meta .hljs-string': {
      color: '#98c379',
    },

    '.hljs-attr,.hljs-variable,.hljs-template-variable,.hljs-type,.hljs-selector-class,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-number':
      {
        color: '#d19a66',
      },

    '.hljs-symbol,.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-title': {
      color: '#61aeee',
    },

    '.hljs-built_in,.hljs-title.class_,.hljs-class .hljs-title': {
      color: '#e6c07b',
    },

    '.hljs-emphasis': {
      fontStyle: 'italic',
    },

    '.hljs-strong': {
      fontWeight: 'bold',
    },

    '.hljs-link': {
      textDecoration: 'underline',
    },
  };
}

export default getSimpleStyleHook('CoHighlight', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',

      pre: {
        padding: token.paddingSM,
        overflow: 'auto',
        color: '#abb2bf',
        background: '#282c34',
        borderRadius: token.borderRadius,
      },

      [`${componentCls}-copy`]: {
        position: 'absolute',
        insetBlockStart: token.sizeXXS,
        insetInlineEnd: token.sizeXXS,
        zIndex: 10,
        color: token.colorWhite,

        '&:hover,&:active': {
          color: `${token.colorWhite} !important`,
        },
      },

      ...getHljs(),
    },
  };
});
