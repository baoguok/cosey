/**
 * Receiver 类负责在 FakeFetch, FakeXMLHttpRequest 类中处理模拟浏览器接收数据的逻辑。
 */

import { Network } from './Network';

export class Receiver extends EventTarget {
  response: Response;
  network: Network;

  constructor(response: Response, network: Network) {
    super();
    this.response = response;
    this.network = network;
  }

  getAllResponseHeaders() {
    let result = '';
    this.response.headers.forEach((value, key) => {
      result += key + ': ' + value + '\r\n';
    });
    return result;
  }

  private total = 0;
  private loaded = 0;

  async accept() {
    return new Promise<void>((resolve, reject) => {
      this.emit('loadstart');

      this.network
        .mergeReadableStream(this.response.clone().body!)
        .then(async (chunks) => {
          this.total = chunks.length;

          return this.network
            .download(this.total, (loaded) => {
              this.loaded = loaded;
              this.emit('progress');
            })
            .then(() => {
              this.emit('load');
              this.emit('loadend');
              resolve();
            });
        })
        .catch((error) => {
          this.emit('error');
          this.emit('loadend');
          reject(error);
        });
    });
  }

  abort() {
    if (this.network.isTransmitting()) {
      this.network.stopTransmitting();
      this.emit('abort');
    }
  }

  timeout() {
    if (this.network.isTransmitting()) {
      this.network.stopTransmitting();
      this.emit('timeout');
    }
  }

  emit(type: keyof XMLHttpRequestEventTargetEventMap) {
    const event = new ProgressEvent(type, {
      lengthComputable: true,
      loaded: this.loaded,
      total: this.total,
    });

    this.dispatchEvent(event);
  }

  addEventListener(
    type: keyof XMLHttpRequestEventTargetEventMap,
    callback: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean,
  ): void {
    super.addEventListener(type, callback, options);
  }

  removeEventListener(
    type: keyof XMLHttpRequestEventTargetEventMap,
    callback: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions | boolean,
  ): void {
    super.addEventListener(type, callback, options);
  }
}
