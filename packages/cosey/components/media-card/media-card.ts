import { PropType } from 'vue';

export interface MediaCardBaseProps {
  src?: string;
  size?: 'mini' | 'small' | 'middle' | 'large';
  name?: string;
  type?: 'image' | 'video' | 'audio' | (string & {});
  title?: string;
  srcList?: string[];
}

export const defaultMediaCardBaseProps = {
  size: 'middle' as const,
};

export const mediaCardBaseProps = {
  size: {
    type: String as PropType<MediaCardBaseProps['size']>,
    default: 'middle',
  },
  src: {
    type: String,
  },
  type: {
    type: String,
  },
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  srcList: {
    type: Array as PropType<string[]>,
  },
};

export interface MediaCardProps extends MediaCardBaseProps {}

export interface MediaCardSlots {
  default?: (props: Record<string, never>) => any;
}

export interface MediaCardExpose {
  view: () => void;
}
