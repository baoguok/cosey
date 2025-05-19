import { Keyframes } from '../cssinjs';

export const contrarotation = new Keyframes('co-ani-contrarotation', {
  '100%': {
    transform: 'rotate(-1turn)',
  },
});

export const rotation = new Keyframes('co-ani-rotation', {
  '100%': {
    transform: 'rotate(1turn)',
  },
});

export const rotation45 = new Keyframes('co-ani-rotation45', {
  '100%': {
    transform: 'rotate(45deg)',
  },
});

export const spinner = new Keyframes('co-ani-spinner', {
  '0%': {
    strokeDasharray: '1,200',
    strokeDashoffset: 0,
  },

  '50%': {
    strokeDasharray: '90,150',
    strokeDashoffset: '-40px',
  },

  '100%': {
    strokeDasharray: '90,150',
    strokeDashoffset: '-120px',
  },
});
