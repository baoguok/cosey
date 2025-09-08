import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoVideoViewer', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      '&:focus': {
        outline: 'none',
      },

      [`${componentCls}-video`]: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
      },
    },
  };
});
