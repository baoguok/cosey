import { isFunction, isThenable } from './is';

function rejectPromise(prom: MyPromise<any>, reason: unknown) {
  if (prom._state !== 'pending') {
    return;
  }
  prom._state = 'rejected';
  prom._reason = reason;
  flushHandlers(prom);
}

function resolvePromise(prom: MyPromise<any>, x: unknown) {
  if (prom._state !== 'pending') {
    return;
  }
  if (isThenable(x)) {
    if (x === prom) {
      rejectPromise(prom, new TypeError('Chaining cycle detected for promise #<MyPromise>'));
      return;
    }
    queueMicrotask(() => {
      x.then(
        (data) => {
          resolvePromise(prom, data);
        },
        (err) => {
          rejectPromise(prom, err);
        },
      );
    });
  } else {
    prom._state = 'fulfilled';
    prom._data = x;
    flushHandlers(prom);
  }
}

function flushHandlers(curPromise: MyPromise<any>) {
  if (curPromise._state === 'pending') {
    return;
  }
  const settledHandlers = curPromise._settledHandlers;

  while (settledHandlers.length) {
    const handler = settledHandlers.shift()!;
    queueMicrotask(() => {
      const { onfulfilled, onrejected, prom } = handler;

      if (!isFunction(onfulfilled) && curPromise._state === 'fulfilled') {
        resolvePromise(prom, curPromise._data);
      } else if (!isFunction(onrejected) && curPromise._state === 'rejected') {
        rejectPromise(prom, curPromise._reason);
      } else {
        try {
          const result =
            curPromise._state === 'fulfilled'
              ? onfulfilled!(curPromise._data)
              : onrejected!(curPromise._reason);
          resolvePromise(prom, result);
        } catch (e) {
          rejectPromise(prom, e);
        }
      }
    });
  }
}

class MyPromise<T> implements PromiseLike<T> {
  _state = 'pending'; // 'pending' | 'fulfilled' | 'rejected'
  _data: any = undefined;
  _reason: any = undefined;
  _settledHandlers: {
    onfulfilled?: ((value: any) => any | PromiseLike<any>) | undefined | null;
    onrejected?: ((reason: any) => any | PromiseLike<any>) | undefined | null;
    prom: MyPromise<unknown>;
  }[] = [];

  constructor(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void,
    ) => void,
  ) {
    const resolve: (value: T | PromiseLike<T>) => void = (data) => {
      resolvePromise(this, data);
    };
    const reject: (reason?: any) => void = (err) => {
      rejectPromise(this, err);
    };
    executor(resolve, reject);
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
  ): PromiseLike<TResult1 | TResult2> {
    const prom = new MyPromise<TResult1 | TResult2>(() => {});
    this._settledHandlers.push({
      onfulfilled,
      onrejected,
      prom,
    });

    flushHandlers(this);

    return prom;
  }

  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
  ) {
    return this.then<T, TResult>(undefined, onrejected);
  }

  finally(onFinally: any): PromiseLike<void> {
    return this.then(
      () => {
        onFinally();
      },
      () => {
        onFinally();
      },
    );
  }
}
