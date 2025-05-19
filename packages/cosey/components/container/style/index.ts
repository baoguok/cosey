import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface ContainerToken extends FullToken<'Container'> {}

const getContainerStyle: GenerateStyle<ContainerToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      padding: token.padding,
    },
  };
};

export default getStyleHook('Container', (token) => {
  return [getContainerStyle(token)];
});
