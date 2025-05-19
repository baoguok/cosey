import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface TransitionGroupToken extends FullToken<'TransitionGroup'> {}

const getTransitionGroupStyle: GenerateStyle<TransitionGroupToken, CSSObject> = (token) => {
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
};

export default getStyleHook('TransitionGroup', (token) => {
  return [getTransitionGroupStyle(token)];
});
