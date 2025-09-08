import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoTransition', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}`]: {
      '&-fade': {
        '&-enter-active, &-leave-active': {
          transition: `opacity ${token.motionDurationSlow} ease`,
        },
        '&-enter-from, &-leave-to': {
          opacity: 0,
        },
      },
    },
  };
});
