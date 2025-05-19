/**
 * ServerResponse 对象是服务器对客户端请求的响应，包含了多种方法和属性，用于控制HTTP响应。
 */

import { type CookieOptions, ServerCookie } from './cookie';
import { mapStatusCodeMessage, type StatusCode } from './mapStatusCodeMessage';

export class ServerResponse {
  private statusCode: StatusCode = 200;

  private statusMessage: undefined | string = undefined;

  private contentType: string | undefined = undefined;

  private contentLength: number | undefined = undefined;

  private body: any;

  private ended = false;

  cookie: ServerCookie;

  constructor(request: Request) {
    this.cookie = new ServerCookie(request.headers.get('cookie') || '');
  }

  private end(data?: any) {
    this.body = data;

    const cookies = this.cookie.toString();
    if (cookies) {
      this.headers.set('Set-Cookie', cookies);
    }
    if (this.contentType) {
      this.headers.set('Content-Type', this.contentType);
    }
    if (this.contentLength !== undefined) {
      this.headers.set('Content-Length', String(this.contentLength));
    }

    this.ended = true;
  }

  // 发送 JSON 响应。
  // 此方法发送一个响应（具有正确的内容类型），该响应是使用 JSON.stringify() 转换为 JSON 字符串的参数。
  json(data: any) {
    try {
      data = JSON.stringify(data);
    } catch {
      data = null;
    }
    if (!this.contentType) {
      this.contentType = 'application/json';
    }
    this.end(data);
  }

  // 发送 HTTP 响应。
  // body 参数可以是 Buffer 对象、String、对象、Boolean 或 Array。
  send(data: string | ArrayBuffer | Array<any> | object) {
    if (!this.contentType) {
      if (typeof data === 'string') {
        this.contentType = 'text/html';
      } else if (data instanceof ArrayBuffer) {
        this.contentType = 'application/octet-stream';
        this.contentLength = data.byteLength;
      } else if (Array.isArray(data) || (data && typeof data === 'object')) {
        this.contentType = 'application/json';
      }
    }
    this.end(data);
  }

  // 将响应 HTTP 状态代码设置为 statusCode，并将注册的状态消息作为文本响应正文发送。
  // 如果指定了未知状态代码，则响应正文将只是代码编号。
  sendStatus(statusCode: StatusCode) {
    this.status(statusCode);
    this.end();
  }

  // 设置响应的 HTTP 状态。
  status(statusCode: StatusCode) {
    this.statusCode = statusCode;
    this.statusMessage = mapStatusCodeMessage[statusCode];
    return this;
  }

  // 获取状态码
  getStatusCode() {
    return this.statusCode;
  }

  // 获取状态文本
  getStatusMessage() {
    return this.statusMessage;
  }

  // 判断是否已准备返回响应
  isEnded() {
    return this.ended;
  }

  getBody() {
    return this.body;
  }

  private headers = new Headers();

  // 返回 field 指定的 HTTP 响应标头。匹配不区分大小写。
  get(name: string) {
    return this.headers.get(name) || null;
  }

  // 判断是否有指定的 HTTP 请求头字段
  has(name: string) {
    return this.headers.has(name) || false;
  }

  // 删除指定的 HTTP 请求头字段
  remove(name: string) {
    this.headers.delete(name);
  }

  // 将响应的 HTTP 标头 field 设置为 value。要一次设置多个字段，请将对象作为参数传递。
  set(obj: object): void;
  set(name: string, value: string): void;
  set(name: string | object, value?: string) {
    if (typeof name === 'object') {
      for (const k in name) {
        this.headers.set(k, name[k as keyof object]);
      }
    } else if (value) {
      this.headers.set(name, value);
    }
  }

  // 将指定的 value 附加到 HTTP 响应标头 field。
  // 如果尚未设置标头，则会创建具有指定值的标头。
  append(name: string, value: string) {
    this.headers.append(name, value);
  }

  // 克隆响应头对象
  cloneHeaders() {
    return new Headers(this.headers);
  }

  // 设置cookie
  setCookie(name: string, value: any, options?: CookieOptions) {
    return this.cookie.set(name, value, options);
  }

  // 获取指定 name 的 cookie
  getCookie(name: string) {
    return this.cookie.get(name);
  }

  // 清除指定 name 的 cookie
  removeCookie(name: string) {
    return this.cookie.remove(name);
  }
}
