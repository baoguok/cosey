/**
 * 实现浏览器的 XMLHttpRequest 类，并对齐进行包装，以便拦截想要的请求。
 */

import { Receiver } from './Receiver';
import { Transmitter } from './Transmitter';
import { RequestInterceptor } from './RequestInterceptor';
import { Network, NetworkConfig } from './Network';

interface FakeRequestInit extends Omit<RequestInit, 'headers'> {
  url: string | URL;
  headers: Headers;
  async?: boolean;
  username?: null | string;
  password?: null | string;
}

const eventTypes = [
  'error',
  'abort',
  'load',
  'loadend',
  'loadstart',
  'progress',
  'timeout',
  'readystatechange',
] as const;

export function createFakeXMLHttpRequest(
  interceptor: RequestInterceptor,
  networkConfig?: NetworkConfig,
) {
  const originalXMLHttpRequest = XMLHttpRequest;

  class FakeXMLHttpRequest extends EventTarget implements XMLHttpRequest {
    static readonly UNSENT = 0;
    static readonly OPENED = 1;
    static readonly HEADERS_RECEIVED = 2;
    static readonly LOADING = 3;
    static readonly DONE = 4;

    readonly UNSENT = 0;
    readonly OPENED = 1;
    readonly HEADERS_RECEIVED = 2;
    readonly LOADING = 3;
    readonly DONE = 4;

    onabort = null;
    onerror = null;
    onload = null;
    onloadend = null;
    onloadstart = null;
    onprogress = null;
    ontimeout = null;

    _readyState = this.UNSENT;

    get readyState() {
      if (!this._shouldIntercept) {
        return this._xhr.readyState;
      }
      return this._readyState;
    }
    set readyState(value: number) {
      this._readyState = value;
    }

    _response: any;
    get response() {
      if (!this._shouldIntercept) {
        return this._xhr.response;
      }
      return this._response;
    }
    set response(value: any) {
      this._response = value;
    }

    _responseText = '';
    get responseText() {
      if (!this._shouldIntercept) {
        return this._xhr.responseText;
      }
      return this._responseText;
    }
    set responseText(value: any) {
      this._responseText = value;
    }

    _responseType: XMLHttpRequestResponseType = '';
    get responseType() {
      if (!this._shouldIntercept) {
        return this._xhr.responseType;
      }
      return this._responseType;
    }
    set responseType(value: any) {
      this._responseType = value;
      this._xhr.responseType = value;
    }

    _responseURL = '';
    get responseURL() {
      if (!this._shouldIntercept) {
        return this._xhr.responseURL;
      }
      return this._responseURL;
    }
    set responseURL(value: string) {
      this._responseURL = value;
    }

    _responseXML: Document | null = null;
    get responseXML() {
      if (!this._shouldIntercept) {
        return this._xhr.responseXML;
      }
      return this._responseXML;
    }
    set responseXML(value: any) {
      this._responseXML = value;
    }

    _status = 0;
    get status() {
      if (!this._shouldIntercept) {
        return this._xhr.status;
      }
      return this._status;
    }
    set status(value: number) {
      this._status = value;
    }

    _statusText = '';
    get statusText() {
      if (!this._shouldIntercept) {
        return this._xhr.statusText;
      }
      return this._statusText;
    }
    set statusText(value: string) {
      this._statusText = value;
    }

    _timeout = 0;
    get timeout() {
      if (!this._shouldIntercept) {
        return this._xhr.timeout;
      }
      return this._timeout;
    }
    set timeout(value: number) {
      this._timeout = value;
      this._xhr.timeout = value;
    }

    timeoutTimer: ReturnType<typeof setTimeout> | null = null;

    network: Network;

    transmitter: Transmitter;

    get upload() {
      if (!this._shouldIntercept) {
        return this._xhr.upload;
      }
      return this.transmitter;
    }

    _withCredentials = false;
    get withCredentials() {
      if (!this._shouldIntercept) {
        return this._xhr.withCredentials;
      }
      return this._withCredentials;
    }
    set withCredentials(value: boolean) {
      this._withCredentials = value;
      this._xhr.withCredentials = value;
    }

    request: Request | null = null;

    _mime: DOMParserSupportedType = 'text/html';

    _receiver: Receiver | undefined;

    _sendFlag = false;

    _requestInit: FakeRequestInit = {
      url: '',
      async: true,
      username: null,
      password: null,
      headers: new Headers(),
    };

    _shouldIntercept = false;

    _xhr = new originalXMLHttpRequest();

    constructor() {
      super();

      this.network = new Network(networkConfig);
      this.transmitter = new Transmitter(this.network);

      eventTypes.forEach((type) => {
        this._xhr.addEventListener(type, (event: any) => {
          setTimeout(() => {
            this.dispatchEvent(event);
            const callback = this[`on${type}`];
            if (callback) {
              callback.call(this, event);
            }
          });
        });
      });
    }

    _setState(state: number) {
      if (state === this.LOADING || this.readyState !== state) {
        this.readyState = state;

        this._emit('readystatechange');

        switch (state) {
          case this.DONE:
            this._emit('load');
            this._emit('loadend');
            break;
        }
      }
    }

    onreadystatechange: ((this: XMLHttpRequest, ev: Event) => any) | null = null;

    getAllResponseHeaders() {
      if (!this._shouldIntercept) {
        return this._xhr.getAllResponseHeaders();
      }

      return this._receiver?.getAllResponseHeaders() ?? '';
    }

    getResponseHeader(name: string) {
      if (!this._shouldIntercept) {
        return this._xhr.getResponseHeader(name);
      }

      if (this.readyState > this.OPENED) {
        const value = this._receiver?.response.headers.get(name);
        if (value) {
          return value;
        }
      }
      return null;
    }

    open(
      method: string,
      url: string | URL,
      async = true,
      username?: string | null,
      password?: string | null,
    ) {
      if (interceptor.has(method.toUpperCase(), url)) {
        this._shouldIntercept = true;
      }

      this.abort();

      Object.assign(this._requestInit, {
        method,
        url: url.toString(),
        async,
        username,
        password,
      });
      this._setState(this.OPENED);

      this._xhr.open(method, url, async, username, password);
    }

    overrideMimeType(mime: string) {
      this._mime = mime as DOMParserSupportedType;

      this._xhr.overrideMimeType(mime);
    }

    setRequestHeader(name: string, value: string) {
      if (this.readyState === this.OPENED) {
        this._requestInit.headers.append(name, value);
      }

      this._xhr.setRequestHeader(name, value);
    }

    _onResponse(receiver: Receiver) {
      this._receiver = receiver;

      receiver.addEventListener('loadstart', () => {
        this._setState(this.HEADERS_RECEIVED);
      });

      receiver.addEventListener('progress', () => {
        this._setState(this.LOADING);
      });

      receiver.addEventListener('load', () => {
        if (this._sendFlag) {
          const response = receiver.response;

          const complete = (data: any) => {
            this.response = data;
            this.responseURL = this.request!.url;
            this.status = response.status;
            this.statusText = response.statusText;

            this._setState(this.DONE);
            this._sendFlag = false;
          };

          switch (this.responseType) {
            case '':
            case 'text':
              response.text().then((text) => {
                this.responseText = text;
                complete(text);
              });
              break;
            case 'document':
              response.text().then((text) => {
                this.responseXML = new DOMParser().parseFromString(text, this._mime);
                complete(this.responseXML);
              });
              break;
            case 'json':
              response.json().then(complete);
              break;
            case 'blob':
              response.blob().then(complete);
              break;
            case 'arraybuffer':
              response.arrayBuffer().then(complete);
              break;
          }
        }
      });

      receiver.addEventListener('error', () => {
        if (this._sendFlag) {
          this._setState(this.DONE);
          this._sendFlag = false;
          this._emit('error');
        }
      });

      receiver.accept().finally(() => {
        if (this.timeoutTimer) {
          clearTimeout(this.timeoutTimer);
        }
      });
    }

    send(body?: XMLHttpRequestBodyInit) {
      if (!this._shouldIntercept) {
        this._xhr.send(body);
        return;
      }

      if (this.readyState !== this.OPENED) {
        return;
      }

      if (this._sendFlag) {
        return;
      }

      this._requestInit.body = body;

      this._sendFlag = true;

      this._emit('loadstart');

      if (this.timeout > 0) {
        this.timeoutTimer = setTimeout(() => {
          this.timeoutTimer = null;
          this.transmitter.timeout();
          this._receiver?.timeout();
          this._emit('timeout');
        }, this.timeout);
      }

      this.request = new Request(this._requestInit.url, this._requestInit);

      // request start
      this.transmitter
        .send(this.request)
        .then(() => {
          // request end

          // response start
          interceptor
            .getResponse(this.request!)
            .then((response) => {
              if (response) {
                this._onResponse(new Receiver(response, this.network));
              }
            })
            .catch(() => {
              this._emit('error');
            });
        })
        .finally(() => {
          if (this.timeoutTimer) {
            clearTimeout(this.timeoutTimer);
          }
        });
    }

    abort() {
      if (!this._shouldIntercept) {
        this._xhr.abort();
        return;
      }

      if (this._sendFlag) {
        this._sendFlag = false;
        this._setState(this.DONE);
        this.readyState = this.UNSENT;
        this.transmitter.abort();
        this._receiver?.abort();
        this._emit('abort');
      }
    }

    _emit(type: keyof XMLHttpRequestEventTargetEventMap | 'readystatechange') {
      const event = new Event(type);
      this.dispatchEvent(event);
      const callback = this[`on${type}`];
      if (callback) {
        callback.call(this, event);
      }
    }
  }

  return FakeXMLHttpRequest;
}
