import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('CoLayoutSwitchEffect', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      flex: 1,

      [`${componentCls}-fade`]: {
        '&-enter-active, &-leave-active': {
          transition: `all ${token.motionDurationSlow}`,
        },

        '&-enter-from, &-leave-to': {
          opacity: 0,
        },

        '&-enter-from': {
          transform: 'translateX(-30px)',
        },

        '&-leave-to': {
          transform: 'translateX(30px)',
        },
      },
    },
  };
});
