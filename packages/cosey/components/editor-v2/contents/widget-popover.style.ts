import { getSimpleStyleHook } from '../../theme';

export default getSimpleStyleHook('CoEditorV2WidgetPopover', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-popper`]: {
      width: 'auto !important',
      padding: '0 !important',
      paddingBlock: `${token.paddingXS} !important`,
      paddingInline: `${token.paddingSM} !important`,
    },
  };
});
