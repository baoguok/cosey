import { type ShallowRef, shallowRef } from 'vue';
import { isNullish } from '../utils';

export interface UseFetchOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (err: any) => void;
  onFinally?: () => void;
  immediate?: boolean;
  initialData?: T;
  stale?: any;
}

interface UseFetchStale<T> {
  isFetching: ShallowRef<boolean>;
  data: ShallowRef<T | undefined>;
  error: ShallowRef<any>;
}

interface UseFetchResult<T, U> extends UseFetchStale<T> {
  execute: (params?: U | undefined) => Promise<void>;
}

const staleMap = new Map<any, UseFetchStale<any>>();

export function useFetch<T = any, U = any>(
  fetcher: (params: U) => Promise<any> | any,
  options: UseFetchOptions<T> = {},
): UseFetchResult<T, U> {
  const { immediate = true, initialData, stale, onSuccess, onError, onFinally } = options;

  const { isFetching, error, data } = (!isNullish(stale) && staleMap.get(stale)) || {
    isFetching: shallowRef(false),
    data: shallowRef<T | undefined>(initialData),
    error: shallowRef<any>(),
  };

  if (!isNullish(stale) && !staleMap.get(stale)) {
    staleMap.set(stale, {
      isFetching,
      error,
      data,
    });
  }

  async function execute(params?: U) {
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
  }

  if (immediate) {
    if (isNullish(stale) || isNullish(data.value)) {
      Promise.resolve().then(() => {
        execute();
      });
    }
  }

  return {
    isFetching,
    error,
    data,
    execute,
  };
}
