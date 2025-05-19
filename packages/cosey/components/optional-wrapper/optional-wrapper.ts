export interface OptionalWrapperProps {
  when?: boolean;
  component?: object;
  props?: object;
}

export interface OptionalWrapperSlots {
  default?: (props: Record<string, any>) => any;
}
