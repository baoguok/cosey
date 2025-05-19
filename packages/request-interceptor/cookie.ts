/**
 * 处理请求和响应中的 cookie
 *
 * 请求的 cookie 通过手动设置 document.cookie 来模拟浏览器行为。
 *
 * 下面的 ServerCookie 用于简化服务器端对 cookie 的操作。
 */

export interface CookieOptions {
  expires?: number | Date | string;
  path?: string;
  domain?: string;
  secure?: boolean;
}

export function createCookie(target: { cookie: string }, defaultOptions: CookieOptions = {}) {
  function set(name: string, value: string, options: CookieOptions = {}) {
    options = Object.assign({}, defaultOptions, options);

    if (!name || /^(?:expires|max-age|path|domain|secure)$/i.test(name)) {
      return false;
    }

    let expires = '';
    if (options.expires) {
      switch (typeof options.expires) {
        case 'number':
          expires =
            options.expires === Infinity
              ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
              : '; max-age=' + options.expires;
          break;
        case 'string':
          expires = '; expires=' + options.expires;
          break;
        case 'object':
          expires = '; expires=' + options.expires.toUTCString();
          break;
      }
    }
    target.cookie =
      encodeURIComponent(name) +
      '=' +
      encodeURIComponent(value) +
      expires +
      (options.domain ? '; domain=' + options.domain : '') +
      (options.path ? '; path=' + options.path : '') +
      (options.secure ? '; secure' : '');
    return true;
  }

  function get(): Record<string, string>;
  function get(name: string): string;
  function get(name?: string) {
    const parts = target.cookie.split('; ');

    const obj: Record<string, string> = {};
    for (const part of parts) {
      const [, key, value] = /^([^=]+)=(.*)$/.exec(part) || [];
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    }

    return name ? obj[name] : obj;
  }

  function remove(name: string, options: CookieOptions = {}) {
    options = Object.assign({}, defaultOptions, options);

    if (!name || !has(name)) {
      return false;
    }
    target.cookie =
      encodeURIComponent(name) +
      '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
      (options.domain ? '; domain=' + options.domain : '') +
      (options.path ? '; path=' + options.path : '');
    return true;
  }

  function has(name: string) {
    return new RegExp(
      '(?:^|;\\s*)' + encodeURIComponent(name).replace(/[-.+*]/g, '\\$&') + '\\s*\\=',
    ).test(target.cookie);
  }

  return {
    get,
    set,
    remove,
    has,
  };
}

export const cookie = createCookie(document, {
  path: '/',
});

export class ServerCookie {
  cookies: Record<
    string,
    {
      value: string;
    } & CookieOptions
  > = {};

  constructor(cookies: string) {
    this.init(cookies);
  }

  init(cookies: string) {
    const parts = cookies.split('; ');

    const obj: Record<string, string> = {};
    for (const part of parts) {
      const [, key, value] = /^([^=]+)=(.*)$/.exec(part) || [];
      this.cookies[obj[decodeURIComponent(key)]] = {
        value: decodeURIComponent(value),
      };
    }
  }

  set(name: string, value: string, options: CookieOptions = {}) {
    this.cookies[name] = {
      value,
      ...options,
    };
  }

  get(name: string) {
    return this.cookies[name]?.value;
  }

  remove(name: string) {
    delete this.cookies[name];
  }

  toString() {
    const result: string[] = [];

    for (const [name, options] of Object.entries(this.cookies)) {
      let expires = '';
      if (options.expires) {
        switch (typeof options.expires) {
          case 'number':
            expires =
              options.expires === Infinity
                ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
                : '; max-age=' + options.expires;
            break;
          case 'string':
            expires = '; expires=' + options.expires;
            break;
          case 'object':
            expires = '; expires=' + options.expires.toUTCString();
            break;
        }
      }
      result.push(
        encodeURIComponent(name) +
          '=' +
          encodeURIComponent(options.value) +
          expires +
          (options.domain ? '; domain=' + options.domain : '') +
          (options.path ? '; path=' + options.path : '') +
          (options.secure ? '; secure' : ''),
      );
    }

    return result.join('; ');
  }
}

export type Cookie = ReturnType<typeof createCookie>;
