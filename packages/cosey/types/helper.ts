export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Writeable<T> = {
  -readonly [key in keyof T]: T[key];
};

export type GetVueComponentProps<T extends new (...args: any) => any> = Writeable<
  InstanceType<T>['$props']
>;

export type GetVueComponentSlots<T extends new (...args: any) => any> = Writeable<
  InstanceType<T>['$slots']
>;

export type GetVueComponentEmits<T extends new (...args: any) => any> = InstanceType<T>['$emit'];
