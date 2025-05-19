/**
 * Transmitter 类负责在 FakeFetch, FakeXMLHttpRequest 类中处理模拟浏览器上传数据的逻辑，
 * 对应于 XMLHttpRequest.upload 对象。
 */

import { Network } from './Network';

export class Transmitter extends EventTarget implements XMLHttpRequestUpload {
  onabort: ((event: Event) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  onload: ((event: Event) => void) | null = null;
  onloadend: ((event: Event) => void) | null = null;
  onloadstart: ((event: Event) => void) | null = null;
  onprogress: ((event: Event) => void) | null = null;
  ontimeout: ((event: Event) => void) | null = null;

  network: Network;

  constructor(network: Network) {
    super();
    this.network = network;
  }

  private total = 0;
  private loaded = 0;

  async send(request: Request) {
    return new Promise<void>((resolve, reject) => {
      this.emit('loadstart');

      this.network
        .mergeReadableStream(request.clone().body!)
        .then(async (chunks) => {
          this.total = chunks.length;

          return this.network
            .upload(this.total, (loaded) => {
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
    const eventHandler = this[`on${type}`];
    if (eventHandler) {
      eventHandler(event);
    }
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
