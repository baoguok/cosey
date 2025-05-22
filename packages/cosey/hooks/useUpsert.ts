import { deepAssign, uuid } from '../utils';
import { ElMessage } from 'element-plus';
import { cloneDeep, pick } from 'lodash-es';
import { computed, onMounted, reactive, Ref, ref, ShallowRef, useTemplateRef } from 'vue';

const mapTypeTitle = {
  edit: '编辑',
  add: '新增',
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
  show?: <T extends UpsertType, R extends T extends 'edit' ? Row : undefined>(
    type: T,
    row: R,
  ) => any;
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
}

export function useUpsert<
  Model extends Record<string, any>,
  Row extends Record<string, any> = Model,
  Data = any,
>(options: UseUpsertOptions<Model, Row>): UseUpsertReturn<Model, Row> {
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
  } = options;

  const type = ref<UpsertType>('add');

  // dialog
  const visible = ref(false);

  const mergedTitle = computed(() => {
    return title || mapTypeTitle[type.value] + (stuffTitle || '');
  });

  const initialModel = cloneDeep(model);

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
    const data = (await beforeSubmit?.(model)) || model;

    let res: any;

    if (type.value === 'add') {
      res = await add?.(data);
      ElMessage.success(addSuccessText || '新增成功');
    } else {
      res = await edit?.(data);
      ElMessage.success(editSuccessText || '编辑成功');
    }

    success?.(res);
    exposeOptions?.success?.();
  };

  const formProps = reactive({
    model,
    ref: formRefKey,
    submit: onSubmit,
  }) as unknown as UseUpsertReturn<Model, Row, Data>['formProps'];

  // data
  const data = ref<Data>();

  // expose
  let exposeOptions: UseUpsertExposeOptions;

  const expose: UseUpsertExpose<Row, Data> = {
    edit: async (row: Row) => {
      type.value = 'edit';
      deepAssign(model, initialModel);

      visible.value = true;
      show?.(type.value, row);

      let filledRow = row;
      if (details) {
        filledRow = await details(row);
      }
      filledRow = { ...filledRow };
      filledRow = beforeFill?.(filledRow) || filledRow;
      Object.assign(model, pick(filledRow, modelKeys));
    },
    add: () => {
      type.value = 'add';
      deepAssign(model, initialModel);

      visible.value = true;
      show?.(type.value, undefined);
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
