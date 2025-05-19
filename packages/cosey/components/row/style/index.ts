import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface RowToken extends FullToken<'Row'> {}

const getRowStyle: GenerateStyle<RowToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
    },
  };
};

export default getStyleHook('Row', (token) => {
  return [getRowStyle(token)];
});
