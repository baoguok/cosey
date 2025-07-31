import { deepAssign, uuid } from '../utils';
import { ElMessage } from 'element-plus';
import { cloneDeep, pick } from 'lodash-es';
import {
  type ShallowRef,
  type Ref,
  type ComputedRef,
  type MaybeRef,
  computed,
  onMounted,
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
  edit: (row: Row) => any;
  add: () => any;
  setData: (data: Data) => UseUpsertExpose<Row, Data>;
  setOptions: (options: UseUpsertExposeOptions) => any;
}

export type UpsertType = 'edit' | 'add';

export interface UseUpsertOptions<Model, Row = Model, Data = Model> {
  title?: string;
  stuffTitle?: string;
  model: Model;
  show?: (type: UpsertType, row?: Row) => void;
  details?: (row: Row) => any;
  beforeFill?: (row: Row) => any;
  beforeSubmit?: (model: Model) => Data | Promise<Data>;
  add?: (data: Data) => any;
  edit?: (data: Data) => any;
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
>(options: MaybeRef<UseUpsertOptions<Model, Row>>): UseUpsertReturn<Model, Row> {
  const {
    model,
    stuffTitle,
    title,
    addSuccessText,
    editSuccessText,
    show,
    details,
    beforeFill,
    beforeSubmit,
    add,
    edit,
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
    const data = (await unref(beforeSubmit)?.(unref(model))) || unref(model);

    let res: any;

    if (type.value === 'add') {
      res = await unref(add)?.(data);
      ElMessage.success(unref(addSuccessText) || t('co.common.addSuccess'));
    } else {
      res = await unref(edit)?.(data);
      ElMessage.success(unref(editSuccessText) || t('co.common.editSuccess'));
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
    edit: async (_row: Row) => {
      type.value = 'edit';
      row.value = _row;
      deepAssign(unref(model), initialModel);

      visible.value = true;
      unref(show)?.(type.value, row.value);

      let filledRow = _row;
      if (unref(details)) {
        filledRow = await unref(details)!(_row);
      }
      filledRow = { ...filledRow };
      filledRow = unref(beforeFill)?.(filledRow) || filledRow;
      Object.assign(unref(model), pick(filledRow, modelKeys));
    },
    add: () => {
      type.value = 'add';
      row.value = undefined;
      deepAssign(unref(model), initialModel);

      visible.value = true;
      unref(show)?.(type.value);
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
  add: () => void;
  edit: (row: Row) => void;
  setData: (data: Data) => void;
  expose: Readonly<ShallowRef<UseUpsertExpose<Row, Data> | null>>;
  ref: string;
}

export function useOuterUpsert<Row extends Record<string, any>, Data>(
  options: UseExternalUpsertOptions,
): UseExternalUpsertReturn<Row, Data> {
  const refKey = uuid();

  const expose = useTemplateRef<UseUpsertExpose<Row, Data>>(refKey);

  const add = () => {
    expose.value?.add();
  };

  const edit = (row: Row) => {
    expose.value?.edit(row);
  };

  const setData = (data: Data) => {
    expose.value?.setData(data);
  };

  onMounted(() => {
    expose.value?.setOptions(options);
  });

  const result = {
    add,
    edit,
    setData,
    expose,
    ref: refKey,
  };

  return result;
}
