/**
 * ServerRequest 对象代表了一个HTTP请求，包含了所有请求数据，如请求头、请求参数、请求体等，
 * 是对 Request 对象的解析、包装、扩展，简化在拦截处理器中对HTTP请求的操作。
 */

import { cookie } from './cookie';
import { qs } from './qs';
import { formDataToObject, searchParamsToObject } from './utils';

export class ServerRequest<Query extends Record<string, unknown> = any, Body = any> {
  payload: Record<PropertyKey, any> = {};

  ip = '';

  method = '';

  url = '';

  protocol = '';

  host = '';

  hostname = '';

  path = '';

  request: Request;

  // 命名路由参数、正则捕获组
  params: Record<string, string> = {};

  query: Query;

  body: Body | undefined;

  cookies: Record<string, string> = {};

  private headers: Headers;

  constructor(request: Request) {
    this.request = request;
    const url = new URL(request.url);
    // https://api.ipify.org/?format=json
    this.ip = '127.0.0.1';
    this.method = request.method;
    this.url = request.url;
    this.protocol = url.protocol;
    this.host = url.host;
    this.hostname = url.hostname;
    this.path = url.pathname;
    this.query = searchParamsToObject(url.searchParams) as any;
    this.cookies = cookie.get();
    this.headers = request.headers;
  }

  // 返回指定的 HTTP 请求头字段
  get(name: string) {
    return this.headers?.get(name) || null;
  }

  // 判断是否有指定的 HTTP 请求头字段
  has(name: string): boolean {
    return this.headers?.has(name) || false;
  }

  // 解析请求正文中提交的数据并赋值给 body 属性。
  // 默认情况下，body 是 undefined，
  // 当请求头 Content-Type 字段是 json、form-data、urlencoded 或text 时，
  // 请求正文会被解析为对应 mime 的格式的数据。
  async parseBody() {
    if (this.method === 'GET' || this.method === 'HEAD') {
      return;
    }

    const contentType = this.headers.get('Content-Type');

    const mimeType = contentType ? contentType.split('; ')[0] : null;

    let body: any;

    switch (mimeType) {
      case 'application/json':
        body = await this.request.json();
        break;
      case 'multipart/form-data':
        body = formDataToObject(await this.request.formData());
        break;
      case 'application/x-www-form-urlencoded':
        body = qs.parse(await this.request.text());
        break;
      case 'text/plain':
        body = await this.request.text();
        break;
    }

    this.body = body;
  }
}
