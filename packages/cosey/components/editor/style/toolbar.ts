import type { CSSObject } from '../../cssinjs';
import type { GenerateStyle } from '../../theme';
import type { EditorToken } from '.';

export const getEditorToolbarStyle: GenerateStyle<EditorToken, CSSObject> = (token) => {
  const { componentCls } = token;

  const toolbarCls = `${componentCls}-toolbar`;

  return {
    [toolbarCls]: {
      display: 'flex',
      flexWrap: 'wrap',
      columnGap: token.padding,
      rowGap: token.paddingXXS,
      padding: token.paddingXS,
      border: `1px solid ${token.colorBorder}`,
      borderTopLeftRadius: token.borderRadius,
      borderTopRightRadius: token.borderRadius,
    },
  };
};
