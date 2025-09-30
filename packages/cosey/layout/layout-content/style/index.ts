import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('CoLayoutContent', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minWidth: 0,
      transition: `margin-inline-start ${token.motionDurationSlow}`,
    },
  };
});
