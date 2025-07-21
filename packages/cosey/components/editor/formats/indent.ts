import { Parchment } from 'quill';

export const INDENT_STEP = 3;

class IndentAttributor extends Parchment.StyleAttributor {
  normalize(value: number) {
    if (!value) {
      // Don't return NaN
      return undefined;
    }
    return Math.ceil(value / INDENT_STEP) * INDENT_STEP;
  }

  add(node: HTMLElement, value: string | number) {
    let normalizedValue = 0;
    if (value === '+1' || value === '-1') {
      const indent = this.value(node) || 0;
      normalizedValue = value === '+1' ? indent + INDENT_STEP : indent - INDENT_STEP;
    } else if (typeof value === 'number') {
      normalizedValue = value;
    }
    if (normalizedValue <= 0) {
      this.remove(node);
      return true;
    }
    return super.add(node, `${normalizedValue}em`);
  }

  canAdd(node: HTMLElement, value: string) {
    return super.canAdd(node, value) || super.canAdd(node, parseInt(value, 10));
  }

  value(node: HTMLElement) {
    return this.normalize(parseInt(super.value(node), 10));
  }
}

const IndentStyle = new IndentAttributor('indent', 'padding-inline-start', {
  scope: Parchment.Scope.BLOCK,
  whitelist: Array(INDENT_STEP * 9)
    .fill(0)
    .map((_, i) => i + 1) as unknown as string[],
});

export { IndentStyle };
