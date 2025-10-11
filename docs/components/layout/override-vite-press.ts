import { seedToken, defaultGenerateColorPalettes, getOverrideStyleHook } from 'cosey/components';

const useStyle = getOverrideStyleHook('OverrideVitepress', (token) => {
  const purpleColors = defaultGenerateColorPalettes(seedToken.purple);
  const blueColors = defaultGenerateColorPalettes(seedToken.blue);
  const greenColors = defaultGenerateColorPalettes(seedToken.green);
  const yellowColors = defaultGenerateColorPalettes(seedToken.yellow);
  const redColors = defaultGenerateColorPalettes(seedToken.red);

  return {
    ':root': {
      // '--vp-c-gray-1': token.colorFill,
      // '--vp-c-gray-2': token.colorFillSecondary,
      // '--vp-c-gray-3': token.colorFillTertiary,
      // '--vp-c-gray-soft': token.colorFillQuaternary,

      '--vp-c-indigo-1': blueColors[10],
      '--vp-c-indigo-2': blueColors[9],
      '--vp-c-indigo-3': blueColors[8],
      '--vp-c-indigo-soft': blueColors[3],

      '--vp-c-purple-1': purpleColors[10],
      '--vp-c-purple-2': purpleColors[9],
      '--vp-c-purple-3': purpleColors[8],
      '--vp-c-purple-soft': purpleColors[3],

      '--vp-c-green-1': greenColors[10],
      '--vp-c-green-2': greenColors[9],
      '--vp-c-green-3': greenColors[8],
      '--vp-c-green-soft': greenColors[3],

      '--vp-c-yellow-1': yellowColors[10],
      '--vp-c-yellow-2': yellowColors[9],
      '--vp-c-yellow-3': yellowColors[8],
      '--vp-c-yellow-soft': yellowColors[3],

      '--vp-c-red-1': redColors[10],
      '--vp-c-red-2': redColors[9],
      '--vp-c-red-3': redColors[8],
      '--vp-c-red-soft': redColors[3],

      // '--vp-c-border': token.colorBorder,
      // '--vp-c-divider': token.colorBorderSecondary,
      // '--vp-c-gutter': token.colorBorderSecondary,

      // '--vp-c-text-1': token.colorText,
      // '--vp-c-text-2': token.colorTextSecondary,
      // '--vp-c-text-3': token.colorTextTertiary,

      '--vp-font-family-base': token.fontFamily,
      '--vp-font-family-mono': token.fontFamilyCode,

      // '--vp-code-color': token.colorText,

      '--vp-layout-max-width': '100vw',

      '.vp-doc': {
        table: {
          display: 'table',
          margin: 0,
        },

        ul: {
          margin: 0,
        },

        'li + li': {
          margin: 0,
        },

        // 自定义

        '> div > :where(ul, ol)': {
          marginBlock: token.margin,

          'li + li': {
            marginBlockStart: token.marginXS,
          },
        },

        '> div :not(pre) > code': {
          color: token.colorText,
          border: `1px solid ${token.colorBorderSecondary}`,
        },

        '> div > table': {
          display: 'table',
          width: '100%',
          marginBlock: token.margin,
          fontFamily: token.fontFamilyCode,

          tbody: {
            'td:nth-child(1)': {
              // fontWeight: token.fontWeightStrong,
            },
            'td:nth-child(3)': {
              // color: token.magenta,
              // fontSize: 13,
            },
            'td:nth-child(4)': {
              // fontSize: 13,
            },
          },
        },
      },

      '.content-container': {
        maxWidth: '1200px !important',
      },
    },
  };
});

export const useOverrideVitePress = () => {
  useStyle();
};
