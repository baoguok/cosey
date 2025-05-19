/**
 * 实现浏览器的 fetch() 方法，并对齐进行包装，以便拦截想要的请求。
 */

import { Network, type NetworkConfig } from './Network';
import { Receiver } from './Receiver';
import { RequestInterceptor } from './RequestInterceptor';
import { Transmitter } from './Transmitter';

export function createFakeFetch(interceptor: RequestInterceptor, networkConfig?: NetworkConfig) {
  const originalFetch = fetch;

  function fakeFetch(input: string | URL | Request, init?: RequestInit) {
    const network = new Network(networkConfig);
    const transmitter = new Transmitter(network);

    const method = init?.method || 'get';

    if (input instanceof Request) {
      input = input.url;
    }

    if (!interceptor.has(method.toUpperCase(), input.toString())) {
      return originalFetch(input, init);
    }

    const request = new Request(input, init);

    return new Promise<Response>((resolve, reject) => {
      if (request.signal) {
        request.signal.addEventListener('abort', () => {
          reject(new Error(`DOMException: signal is aborted`));
        });
      }

      // request start
      transmitter.send(request).then(() => {
        // request end

        // response start
        interceptor
          .getResponse(request)
          .then((response) => {
            if (request.signal && request.signal.aborted) {
              return;
            }
            if (response) {
              const receiver = new Receiver(response, network);
              receiver.addEventListener('load', () => {
                resolve(response);
              });
              receiver.accept();
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  }

  return fakeFetch;
}
