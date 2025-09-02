import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface FormQueryToken extends FullToken<'FormQuery'> {}

const getFormQueryStyle: GenerateStyle<FormQueryToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`${componentCls}-form-item-buttons`]: {
        marginInlineStart: 'auto',
        alignSelf: 'flex-end',

        '.el-form-item__label': {
          display: 'none',
        },
      },

      [`${componentCls}-buttons`]: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',

        '&.is-inline': {
          justifyContent: 'flex-start',
        },
      },
    },
  };
};

export default getStyleHook('FormQuery', (token) => {
  return [getFormQueryStyle(token)];
});
