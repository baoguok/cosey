import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoDndSort', (token) => {
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
});
