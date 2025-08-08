import { deepAssign, uuid } from '../utils';
import { ElMessage } from 'element-plus';
import { cloneDeep, pick } from 'lodash-es';
import {
  type ShallowRef,
  type Ref,
  type ComputedRef,
  type MaybeRef,
  computed,
  reactive,
  ref,
  shallowRef,
  useTemplateRef,
  unref,
  readonly,
} from 'vue';

import { useLocale } from '../hooks';
import { toRefs } from '@vueuse/core';

const mapTypeTitle = {
  edit: 'co.common.edit',
  add: 'co.common.add',
};

export interface UseUpsertExposeOptions {
  success?: () => any;
}

export interface UseUpsertExpose<Row extends Record<string, any>, Data = any> {
  edit: (row: Row, ...args: any[]) => any;
  add: (...args: any[]) => any;
  setData: (data: Data) => UseUpsertExpose<Row, Data>;
  setOptions: (options: UseUpsertExposeOptions) => any;
}

export type UpsertType = 'edit' | 'add';

export interface UseUpsertOptions<Model, Row = Model> {
  title?: string;
  stuffTitle?: string;
  model: Model;
  onAdd?: (...args: any[]) => void;
  onEdit?: (row: Row, ...args: any[]) => void;
  onShow?: () => void;
  detailsFetch?: (row: Row) => any;
  beforeFill?: (row: Row) => any;
  addFetch?: () => any;
  editFetch?: () => any;
  success?: (res: any) => any;
  addSuccessText?: string;
  editSuccessText?: string;
}

export interface UseUpsertReturn<
  Model extends Record<string, any>,
  Row extends Record<string, any> = Model,
  Data = any,
> extends UseUpsertExpose<Row, Data> {
  dialogProps: {
    modelvalue: boolean;
    'onUpdate:modelValue': (value: boolean) => void;
    title: string;
  };
  formProps: {
    model: Model;
    ref: string;
    submit: () => Promise<void>;
  };
  formRef: any;
  data: Ref<Data | undefined>;
  expose: UseUpsertExpose<Row, Data>;
  row: ShallowRef<Row | undefined>;
  type: Readonly<Ref<UpsertType>>;
  isEdit: ComputedRef<boolean>;
  isAdd: ComputedRef<boolean>;
}

export function useUpsert<
  Model extends Record<string, any>,
  Row extends Record<string, any> = Model,
  Data = any,
>(options: MaybeRef<UseUpsertOptions<Model, Row>>): UseUpsertReturn<Model, Row, Data> {
  const {
    model,
    stuffTitle,
    title,
    addSuccessText,
    editSuccessText,
    onAdd,
    onEdit,
    onShow,
    detailsFetch,
    beforeFill,
    addFetch,
    editFetch,
    success,
  } = toRefs(computed(() => unref(options)));

  const { t, lang } = useLocale();

  const type = ref<UpsertType>('add');
  const isEdit = computed(() => type.value === 'edit');
  const isAdd = computed(() => type.value === 'add');

  // dialog
  const visible = ref(false);

  const mergedTitle = computed(() => {
    return (
      unref(title) ||
      t(mapTypeTitle[type.value]) + (lang.value === 'zh-cn' ? '' : ' ') + (unref(stuffTitle) || '')
    );
  });

  const initialModel = cloneDeep(unref(model));

  const modelKeys = Object.keys(initialModel);

  const dialogProps = reactive({
    modelValue: visible,
    'onUpdate:modelValue': (value: boolean) => {
      visible.value = value;
    },
    title: mergedTitle,
  }) as unknown as UseUpsertReturn<Model, Row, Data>['dialogProps'];

  // form
  const formRefKey = uuid();

  const formRef = useTemplateRef(formRefKey);

  const onSubmit = async () => {
    let res: any;

    if (type.value === 'add') {
      res = await unref(addFetch)?.();
      ElMessage.success(unref(addSuccessText) || t('co.common.operateSuccess'));
    } else {
      res = await unref(editFetch)?.();
      ElMessage.success(unref(editSuccessText) || t('co.common.operateSuccess'));
    }

    unref(success)?.(res);
    exposeOptions?.success?.();
  };

  const formProps = reactive({
    model,
    ref: formRefKey,
    submit: onSubmit,
  }) as unknown as UseUpsertReturn<Model, Row, Data>['formProps'];

  // data
  const data = shallowRef<Data>();
  const row = shallowRef<Row>();

  // expose
  let exposeOptions: UseUpsertExposeOptions;

  const expose: UseUpsertExpose<Row, Data> = {
    edit: async (...args) => {
      type.value = 'edit';
      row.value = args[0];
      deepAssign(unref(model), initialModel);

      unref(onEdit)?.(...args);

      visible.value = true;
      unref(onShow)?.();

      let filledRow = row.value;
      if (unref(detailsFetch)) {
        filledRow = await unref(detailsFetch)!(row.value);
      }
      filledRow = { ...filledRow };
      filledRow = unref(beforeFill)?.(filledRow) || filledRow;
      Object.assign(unref(model), pick(filledRow, modelKeys));
    },
    add: (...args) => {
      type.value = 'add';
      row.value = undefined;
      deepAssign(unref(model), initialModel);

      unref(onAdd)?.(...args);

      visible.value = true;
      unref(onShow)?.();
    },
    setData: (_data: Data) => {
      data.value = _data;
      return expose;
    },
    setOptions: (options: UseUpsertExposeOptions) => {
      exposeOptions = options;
    },
  };

  const result: UseUpsertReturn<Model, Row, Data> = {
    ...expose,
    dialogProps,
    formProps,
    formRef,
    data,
    expose,
    row,
    type: readonly(type),
    isEdit,
    isAdd,
  };

  return result;
}

export interface UseExternalUpsertOptions {
  success?: () => any;
}

export interface UseExternalUpsertReturn<Row extends Record<string, any>, Data> {
  add: (...args: any[]) => void;
  edit: (...args: any[]) => void;
  setData: (data: Data) => void;
  expose: Readonly<ShallowRef<UseUpsertExpose<Row, Data> | null>>;
  ref: (_expose: any) => void;
}

export function useOuterUpsert<Row extends Record<string, any>, Data>(
  options: UseExternalUpsertOptions,
): UseExternalUpsertReturn<Row, Data> {
  const expose = ref<UseUpsertExpose<Row, Data> | null>(null);

  const vnodeRef = (_expose: UseUpsertExpose<Row, Data> | null) => {
    expose.value = _expose;

    if (_expose) {
      _expose.setOptions(options);
    }
  };

  const add = (...args: any) => {
    expose.value?.add(...args);
  };

  const edit = (row: Row, ...args: any) => {
    expose.value?.edit(row, ...args);
  };

  const setData = (data: Data) => {
    expose.value?.setData(data);
  };

  const result = {
    add,
    edit,
    setData,
    expose,
    ref: vnodeRef,
  };

  return result;
}
