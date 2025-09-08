import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoStackDialog', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}`]: {
      display: 'flex',
      flexDirection: 'column',
      margin: '5vh auto 10vh',
      width: '80%',
      height: 'calc(100vh - 15vh)',
      transition: token.motionDurationSlow,

      [`${componentCls}-header`]: {
        flex: 'none',
      },

      [`${componentCls}-body`]: {
        flex: 1,
        minHeight: 0,
      },

      [`${componentCls}-footer`]: {
        flex: 'none',
      },
    },
  };
});
