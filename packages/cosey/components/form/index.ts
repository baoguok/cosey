import { withInstall } from '../utils';
import Form from './form';
import FormItem from './form-item.vue';
import { useBubbleTemplate } from './useBubbleTemplate';
import { useFormTemplate } from './useFormTemplate';
import { getFormItemWidth, useFormItemWidth } from './useFormItemWidth';

export * from './form.api';
export * from './form-item.api';

const _Form = withInstall(Form);
const _FormItem = withInstall(FormItem);

export {
  _Form as Form,
  _FormItem as FormItem,
  useFormTemplate,
  useBubbleTemplate,
  useFormItemWidth,
  getFormItemWidth,
};
export default _Form;
