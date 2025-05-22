import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface DndSortToken extends FullToken<'DndSort'> {}

const getDndSortStyle: GenerateStyle<DndSortToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-item`]: {
      position: 'relative',
      display: 'flex',
      maxWidth: '100%',
      alignItems: 'center',

      [`${componentCls}-item-holder`]: {
        marginInlineEnd: token.marginXS,
        width: token.size,
        flex: 'none',
        color: token.colorTextSecondary,
        cursor: 'grab',

        '&:active': {
          cursor: 'grabbing',
        },
      },

      [`${componentCls}-item-content`]: {
        minWidth: 0,
        flex: 1,
      },
    },
  };
};

export default getStyleHook('DndSort', (token) => {
  return [getDndSortStyle(token)];
});
