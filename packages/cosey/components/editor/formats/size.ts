import { Parchment } from 'quill';

export const sizes = Array(100)
  .fill(0)
  .map((_, i) => i + 1 + 'px');

export const SizeStyle = new Parchment.StyleAttributor('size', 'font-size', {
  scope: Parchment.Scope.INLINE,
  whitelist: sizes,
});
