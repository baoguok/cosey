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
          await promise.onfulfilled?.(undefined);
          done();
        } catch (err) {
          promise.onrejected?.(err);
        } finally {
          instance.confirmButtonLoading = false;
        }
      } else {
        done();
        promise.onrejected?.(undefined);
      }
      promise.onfinally?.();
    },
  });

  return promise;
}

class CustomPromise<T> extends Promise<T> {
  onfulfilled: ((value: any) => any | PromiseLike<any>) | undefined | null;
  onrejected: ((reason?: any) => any | PromiseLike<any>) | undefined | null;
  onfinally: (() => void) | undefined | null;

  constructor(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void,
    ) => void,
  ) {
    super(executor);
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
  ): Promise<TResult1 | TResult2> {
    this.onfulfilled = onfulfilled;
    this.onrejected = onrejected;
    return super.then(onfulfilled, onrejected);
  }

  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
  ): Promise<T | TResult> {
    this.onrejected = onrejected;
    return super.catch(onrejected);
  }

  finally(onfinally?: (() => void) | undefined | null): Promise<T> {
    this.onfinally = onfinally;
    return super.finally(onfinally);
  }
}
