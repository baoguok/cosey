import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoAudioViewer', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'fixed',
      inset: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      '&:focus': {
        outline: 'none',
      },
    },
  };
});
