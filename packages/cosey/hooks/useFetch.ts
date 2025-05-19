import { shallowRef } from 'vue';

export interface UseFetchOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (err: any) => void;
  onFinally?: () => void;
  immediate?: boolean;
  initialData?: T;
}

export function useFetch<T = unknown, U = unknown>(
  fetcher: (params: U) => Promise<any> | any,
  options: UseFetchOptions<T> = {},
) {
  const { immediate = true, initialData, onSuccess, onError, onFinally } = options;

  const isFetching = shallowRef(false);
  const data = shallowRef<T | undefined>(initialData);
  const error = shallowRef<any>();

  const execute = async (params?: U) => {
    if (isFetching.value) {
      return;
    }

    try {
      error.value = undefined;
      isFetching.value = true;

      const res = await fetcher(params as U);
      data.value = res;
      onSuccess?.(res);
    } catch (err) {
      error.value = err;
      onError?.(err);
    } finally {
      isFetching.value = false;
      onFinally?.();
    }
  };

  if (immediate) {
    Promise.resolve().then(() => {
      execute();
    });
  }

  return {
    isFetching,
    data,
    error,
    execute,
  };
}
