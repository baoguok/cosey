export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type ResizePosition = 'nw' | 'ne' | 'sw' | 'se';

export type ResizeAlign = 'left' | 'center' | 'right';

export const mapIcons = {
  left: 'co:text-align-left',
  center: 'co:text-align-center',
  right: 'co:text-align-right',
};

export const getAlign = (el?: HTMLElement): ResizeAlign | null => {
  if (!el) {
    return null;
  }

  const style = el.style;

  if (style.float === 'left') {
    return 'left';
  }
  if (style.float === 'right') {
    return 'right';
  }
  if (style.marginLeft === 'auto' && style.marginRight === 'auto' && style.display === 'block') {
    return 'center';
  }
  return null;
};

export const onDrag = (
  downRect: Rect,
  currRect: Rect,
  options: {
    position: ResizePosition;
    x: number;
    y: number;
    min: number;
    max: number;
    cb: (rect: Rect) => void;
  },
) => {
  const { x, y } = currRect;
  const aspectScale = downRect.width / downRect.height;
  let width = 0;

  switch (options.position) {
    case 'nw':
    case 'sw':
      width = downRect.x + downRect.width - options.x;
      break;
    case 'ne':
    case 'se':
      width = options.x - downRect.x;
      break;
  }

  if (width < options.min) {
    width = options.min;
  } else if (width > options.max) {
    width = options.max;
  }

  const height = width / aspectScale;

  options.cb({
    x,
    y,
    width,
    height,
  });
};

export const setAlignStyle = (el: HTMLElement, align: ResizeAlign | null) => {
  let style: Record<string, any>;

  switch (align) {
    case null:
      style = {
        display: '',
        float: '',
        marginLeft: '',
        marginRight: '',
      };
      break;
    case 'left':
      style = {
        display: '',
        float: 'left',
        marginLeft: '',
        marginRight: '',
      };
      break;
    case 'center':
      style = {
        display: 'block',
        float: '',
        marginLeft: 'auto',
        marginRight: 'auto',
      };
      break;
    case 'right':
      style = {
        display: '',
        float: 'right',
        marginLeft: '',
        marginRight: '',
      };
      break;
  }

  Object.assign(el.style, style);
};
