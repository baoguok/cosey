import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoTransitionGroup', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-slide`]: {
      '&-move, &-enter-active, &-leave-active': {
        transition: `all ${token.motionDurationSlow} ease`,
      },

      '&-enter-from, &-leave-to': {
        opacity: 0,
        transform: 'translateX(30px)',
      },

      '&-leave-active': {
        position: 'absolute',
      },
    },

    [`${componentCls}-flip`]: {
      '&-move, &-enter-active, &-leave-active': {
        transition: `all ${token.motionDurationSlow} ease`,
      },

      '&-enter-from, &-leave-to': {
        opacity: 0,
        transform: 'scaleY(0)',
      },

      '&-leave-active': {
        position: 'absolute',
      },
    },

    [`${componentCls}-fade`]: {
      '&-move, &-enter-active, &-leave-active': {
        transition: `all ${token.motionDurationSlow} ease`,
      },

      '&-enter-from, &-leave-to': {
        opacity: 0,
      },

      '&-leave-active': {
        position: 'absolute',
      },
    },
  };
});
