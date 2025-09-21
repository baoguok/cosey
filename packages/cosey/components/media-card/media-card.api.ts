import type { SlotsType, PropType, ExtractPropTypes, ExtractPublicPropTypes } from 'vue';

export const mediaCardBaseProps = {
  src: {
    type: String,
  },
  size: {
    type: String as PropType<'mini' | 'small' | 'middle' | 'large'>,
    default: 'middle',
  },
  name: {
    type: String,
  },
  type: {
    type: String as PropType<'image' | 'video' | 'audio' | (string & {})>,
  },
  title: {
    type: String,
  },
  srcList: {
    type: Array as PropType<string[]>,
  },
};

export type MediaCardBaseProps = ExtractPropTypes<typeof mediaCardBaseProps>;

export type MediaCardBasePublicProps = ExtractPublicPropTypes<typeof mediaCardBaseProps>;

export const mediaCardProps = {
  ...mediaCardBaseProps,
};

export type MediaCardProps = ExtractPropTypes<typeof mediaCardProps>;

export interface MediaCardSlots {
  default: {};
}

export const mediaCardSlots = {} as SlotsType<MediaCardSlots>;

export interface MediaCardExpose {
  view: () => void;
}
