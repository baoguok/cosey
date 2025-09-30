import { ElMessageBox, type ElMessageBoxOptions } from 'element-plus';
import { type VNode } from 'vue';
import { getOutsideLocale } from '../hooks';

export function warningConfirm(
  message: string | VNode | (() => VNode),
  options?: ElMessageBoxOptions,
) {
  const promise = new CustomPromise(() => {});

  const { t } = getOutsideLocale();

  ElMessageBox({
    title: t('co.common.warning'),
    ...options,
    type: 'warning',
    message,
    showCancelButton: true,
    customStyle: {
      position: 'absolute',
      left: '50%',
      top: '30vh',
      transform: 'translateX(-50%)',
      ...options?.customStyle,
    },
    async beforeClose(action, instance, done) {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true;

        try {
          const res = await promise._onFulfilled?.(undefined);
          promise._resolve?.(res);
          done();
        } catch (err) {
          promise._onRejected?.(err);
          promise._reject?.(err);
        } finally {
          instance.confirmButtonLoading = false;
        }
      } else {
        done();
        promise._onRejected?.(undefined);
        promise._reject?.();
      }
    },
  });

  return promise;
}

class CustomPromise<T> extends Promise<T> {
  _onFulfilled: ((value: any) => any | PromiseLike<any>) | undefined | null;
  _onRejected: ((reason?: any) => any | PromiseLike<any>) | undefined | null;
  _resolve: null | ((value: any | PromiseLike<any>) => void) = null;
  _reject: null | ((reason?: any) => void) = null;

  constructor(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void,
    ) => void,
  ) {
    super(executor);
  }

  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
  ): Promise<TResult1 | TResult2> {
    this._onFulfilled = onFulfilled;
    this._onRejected = onRejected;
    return new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  catch<TResult = never>(
    onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
  ): Promise<T | TResult> {
    return this.then(null, onRejected);
  }

  finally(onFinally?: (() => void) | undefined | null): Promise<T> {
    return this.then(
      () => {
        onFinally?.();
      },
      () => {
        onFinally?.();
      },
    ) as Promise<T>;
  }
}
