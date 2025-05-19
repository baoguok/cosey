import { TinyColor } from '@ctrl/tinycolor';
import { capitalize } from 'lodash-es';
import { type AliasToken, getSimpleStyleHook } from '../theme';

type ColorType = 'primary' | 'success' | 'error' | 'warning' | 'info';

function generateColorPalettes(type: ColorType, token: AliasToken, alias?: string) {
  const capType = capitalize(type);
  const elType = alias || type;

  return {
    [`--el-color-${elType}`]: token[`color${capType}`],
    [`--el-color-${elType}-dark-2`]: token[`color${capType}TextActive`],
    [`--el-color-${elType}-light-1`]: token[`color${capType}Text`],
    [`--el-color-${elType}-light-2`]: token[`color${capType}TextHover`],
    [`--el-color-${elType}-light-3`]: token[`color${capType}Active`],
    [`--el-color-${elType}-light-4`]: token[`color${capType}`],
    [`--el-color-${elType}-light-5`]: token[`color${capType}Hover`],
    [`--el-color-${elType}-light-6`]: token[`color${capType}BorderHover`],
    [`--el-color-${elType}-light-7`]: token[`color${capType}Border`],
    [`--el-color-${elType}-light-8`]: token[`color${capType}BgHover`],
    [`--el-color-${elType}-light-9`]: token[`color${capType}Bg`],
  };
}

function getRGBVar(color: TinyColor) {
  return `${color.r},${color.g},${color.b}`;
}

export default getSimpleStyleHook('OverrideElementPlus', (token) => {
  const { hashId } = token;

  return {
    [`.${hashId}`]: {
      '--el-color-white': token.colorWhite,
      '--el-color-black': token.colorBlack,
      '--el-color-primary-rgb': getRGBVar(new TinyColor(token.colorPrimary)),
      '--el-color-success-rgb': getRGBVar(new TinyColor(token.colorSuccess)),
      '--el-color-warning-rgb': getRGBVar(new TinyColor(token.colorWarning)),
      '--el-color-danger-rgb': getRGBVar(new TinyColor(token.colorError)),
      '--el-color-error-rgb': getRGBVar(new TinyColor(token.colorError)),
      '--el-color-info-rgb': getRGBVar(new TinyColor(token.colorInfo)),
      '--el-font-size-extra-large': token.fontSizeXL,
      '--el-font-size-large': token.fontSizeLG,
      '--el-font-size-medium': token.fontSizeLG,
      '--el-font-size-base': token.fontSize,
      '--el-font-size-small': token.fontSizeSM,
      '--el-font-size-extra-small': token.fontSizeSM,
      '--el-font-family': token.fontFamily,
      '--el-font-weight-primary': token.fontWeightStrong,
      '--el-font-line-height-primary': token.lineHeightLG * token.fontSizeLG,
      '--el-index-normal': '1',
      '--el-index-top': '1000',
      '--el-index-popper': '2000',
      '--el-border-radius-base': token.borderRadius,
      '--el-border-radius-small': token.borderRadiusSM,
      '--el-border-radius-round': '20px',
      '--el-border-radius-circle': '100%',
      '--el-transition-duration': token.motionDurationSlow,
      '--el-transition-duration-fast': token.motionDurationFast,
      '--el-transition-function-ease-in-out-bezier': token.motionEaseInOut,
      '--el-transition-function-fast-bezier': token.motionEaseInOutCirc,
      '--el-transition-all': `all ${token.motionDurationSlow} ${token.motionEaseInOut}`,
      '--el-transition-fade': `opacity ${token.motionDurationSlow} ${token.motionEaseInOutCirc}`,
      '--el-transition-md-fade': `transform ${token.motionDurationSlow} ${token.motionEaseInOutCirc}, opacity ${token.motionDurationSlow} ${token.motionEaseInOutCirc}`,
      '--el-transition-fade-linear': `opacity ${token.motionDurationFast} linear`,
      '--el-transition-border': `border-color ${token.motionDurationFast} ${token.motionEaseInOut}`,
      '--el-transition-box-shadow': `box-shadow ${token.motionDurationFast} ${token.motionEaseInOut}`,
      '--el-transition-color': `color ${token.motionDurationFast} ${token.motionEaseInOut}`,
      '--el-component-size-large': token.controlHeightLG,
      '--el-component-size': token.controlHeight,
      '--el-component-size-small': token.controlHeightSM,
      ...generateColorPalettes('primary', token),
      ...generateColorPalettes('success', token),
      ...generateColorPalettes('warning', token),
      ...generateColorPalettes('error', token, 'danger'),
      ...generateColorPalettes('error', token),
      // ...generateColorPalettes('info', token),
      '--el-bg-color': token.colorBgContainer,
      '--el-bg-color-page': token.colorBgLayout,
      // '--el-bg-color-overlay': '#ffffff',
      '--el-text-color-primary': token.colorText,
      '--el-text-color-regular': token.colorText,
      '--el-text-color-secondary': token.colorTextTertiary,
      '--el-text-color-placeholder': token.colorTextPlaceholder,
      '--el-text-color-disabled': token.colorTextDisabled,
      '--el-border-color': token.colorBorder,
      '--el-border-color-light': token.colorBorderSecondary,
      '--el-border-color-lighter': token.colorBorderSecondary,
      '--el-border-color-extra-light': token.colorBorderSecondary,
      '--el-border-color-dark': token.colorBorder,
      '--el-border-color-darker': token.colorBorder,
      // --el-fill-color: #f0f2f5;
      // --el-fill-color-light: #f5f7fa;
      // --el-fill-color-lighter: #fafafa;
      // --el-fill-color-extra-light: #fafcff;
      // --el-fill-color-dark: #ebedf0;
      // --el-fill-color-darker: #e6e8eb;
      // --el-fill-color-blank: #ffffff;
      '--el-box-shadow': token.boxShadow,
      '--el-box-shadow-light': token.boxShadowSecondary,
      '--el-box-shadow-lighter': token.boxShadowTertiary,
      '--el-box-shadow-dark': token.boxShadow,
      '--el-disabled-bg-color': token.colorBgContainerDisabled,
      '--el-disabled-text-color': token.colorTextDisabled,
      '--el-disabled-border-color': token.colorBorder,
      // '--el-overlay-color': token.colorBgMask,
      // '--el-overlay-color-light': token.colorBgMask,
      // '--el-overlay-color-lighter': token.colorBgMask,
      // '--el-mask-color': 'rgba(255, 255, 255, .9)',
      '--el-border-width': token.lineWidth,
      '--el-border-style': token.lineType,
      '--el-border-color-hover': token.colorTextDisabled,
      '--el-border': `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
      '--el-svg-monochrome-grey': token.colorBorder,
    },

    '.el-button': {
      '--el-button-font-weight': 'normal',
    },

    '.el-checkbox': {
      '--el-checkbox-font-weight': 'normal',
      '--el-checkbox-checked-text-color': token.colorText,
    },

    '.el-radio': {
      '--el-radio-font-weight': 'normal',
    },
    '.el-radio__input.is-checked+.el-radio__label': {
      color: token.colorText,
    },

    '.el-table': {
      // '--el-table-header-text-color': token.colorTextSecondary,
    },
  };
});
