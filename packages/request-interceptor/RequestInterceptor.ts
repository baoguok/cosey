/**
 * 对指定的路由进行拦截，返回自定义响应。
 */

import { logError } from './utils';
import { Receiver } from './Receiver';
import { ServerRequest } from './ServerRequest';
import { ServerResponse } from './ServerResponse';
import { Network } from './Network';

export type InterceptorCallbackReturn =
  | ConstructorParameters<typeof Receiver>
  | Promise<ConstructorParameters<typeof Receiver>>;

type Data = Record<string, unknown>;

type Method =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'HEAD'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'ALL';

export type MiddlewareHandler<Query extends Data = any, Body = any> = (context: {
  req: ServerRequest<Query, Body>;
  res: ServerResponse;
}) => any | Promise<any>;

export interface MiddlewarePayload {
  [key: PropertyKey]: any;
}

export interface Middleware {
  method: Method;
  regexp: RegExp;
  url: string | URL;
  handler: MiddlewareHandler;
  payload?: MiddlewarePayload;
}

export interface Guard {
  (context: {
    req: ServerRequest;
    res: ServerResponse;
    payload?: MiddlewarePayload;
  }): true | void | undefined | Promise<true | void | undefined>;
}

export class RequestInterceptor {
  network: Network;
  prefix?: string;

  constructor(options?: { prefix?: string }) {
    this.network = new Network();
    this.prefix = options?.prefix;
  }

  middlewares: Middleware[] = [];

  list: Record<string, Record<string, (req: Request) => InterceptorCallbackReturn>> = {};

  beforeRequest?: (req: Request) => void;
  afterResponse?: (req: Request, res: Response) => void;

  use(handler: MiddlewareHandler) {
    this.middlewares.push({
      method: 'ALL',
      regexp: this.regularize('*'),
      url: '*',
      handler,
    });
    return this;
  }

  all(url: string | URL, handler: MiddlewareHandler, payload?: MiddlewarePayload) {
    this.middlewares.push({
      method: 'ALL',
      regexp: this.regularize(url),
      url,
      handler,
      payload,
    });
    return this;
  }

  method<Query extends Data = any, Body = any>(
    method: Method,
    url: string | URL,
    handler: MiddlewareHandler<Query, Body>,
    payload?: MiddlewarePayload,
  ) {
    url = this.prefix ? this.prefix + url : url;

    this.middlewares.push({
      method,
      regexp: this.regularize(url),
      url,
      handler,
      payload,
    });
    return this;
  }

  get<Query extends Data = any>(
    url: string | URL,
    handler: MiddlewareHandler<Query>,
    payload?: MiddlewarePayload,
  ) {
    return this.method('GET', url, handler, payload);
  }

  post<Query extends Data = any, Body = any>(
    url: string | URL,
    handler: MiddlewareHandler<Query, Body>,
    payload?: MiddlewarePayload,
  ) {
    return this.method<Query, Body>('POST', url, handler, payload);
  }

  patch<Query extends Data = any, Body = any>(
    url: string | URL,
    handler: MiddlewareHandler<Query, Body>,
    payload?: MiddlewarePayload,
  ) {
    return this.method<Query, Body>('PATCH', url, handler, payload);
  }

  put<Query extends Data = any, Body = any>(
    url: string | URL,
    handler: MiddlewareHandler<Query, Body>,
    payload?: MiddlewarePayload,
  ) {
    return this.method<Query, Body>('PUT', url, handler, payload);
  }

  delete<Query extends Data = any, Body = any>(
    url: string | URL,
    handler: MiddlewareHandler<Query, Body>,
    payload?: MiddlewarePayload,
  ) {
    return this.method<Query, Body>('DELETE', url, handler, payload);
  }

  head(url: string | URL, handler: MiddlewareHandler, payload?: MiddlewarePayload) {
    return this.method('HEAD', url, handler, payload);
  }

  trace(url: string | URL, handler: MiddlewareHandler, payload?: MiddlewarePayload) {
    return this.method('TRACE', url, handler, payload);
  }

  payload(url: string | URL, handler: MiddlewareHandler, payload?: MiddlewarePayload) {
    return this.method('OPTIONS', url, handler, payload);
  }

  connect(url: string | URL, handler: MiddlewareHandler, payload?: MiddlewarePayload) {
    return this.method('CONNECT', url, handler, payload);
  }

  private escapeRegExp(str: string) {
    return str.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
  }

  private regularize(url: string | URL | RegExp) {
    if (url instanceof RegExp) {
      return url;
    }
    url = url.toString();

    return url === '*'
      ? /^.*$/
      : new RegExp(
          `^${this.escapeRegExp(url)
            .replace(/\*/g, '[^/]*')
            .replace(/:([^/]+)(?:\(([^)]+)\))?/g, (_, name, customReg) => {
              name = this.escapeRegExp(name);
              if (customReg) {
                return `(?<${name}>${customReg})`;
              }
              return `(?<${name}>[^/]+)`;
            })}$`,
        );
  }

  private getMiddleware(method: string, url: string | URL) {
    return this.middlewares.find((item) => {
      return item.method === method && item.regexp.test(url.toString().replace(/\?.*$/, ''));
    });
  }

  has(method: string, url: string | URL) {
    return !!this.getMiddleware(method, url);
  }

  async pipe(req: Request) {
    const serverRequest = new ServerRequest(req);
    const serverResponse = new ServerResponse(req);
    try {
      await serverRequest.parseBody();

      for (const { method, regexp, handler, payload } of this.middlewares) {
        let result: RegExpExecArray | null = null;
        if (method === req.method && (result = regexp.exec(new URL(req.url).pathname))) {
          if (result.groups) {
            serverRequest.params = result.groups;
          }

          let outPass = true;
          for (const guard of this.guards) {
            const pass = await guard({
              req: serverRequest,
              res: serverResponse,
              payload,
            });
            if (pass !== true) {
              outPass = false;
              break;
            }
          }
          if (!outPass) {
            continue;
          }

          await handler({ req: serverRequest, res: serverResponse });
          if (serverResponse.isEnded()) {
            break;
          }
        }
      }
    } catch (err: any) {
      logError(err);
      serverResponse.sendStatus(500);
    }
    return serverResponse;
  }

  async getResponse(req: Request) {
    if (this.beforeRequest) {
      this.beforeRequest(req);
    }
    const serverResponse = await this.pipe(req);
    if (serverResponse.isEnded()) {
      const response = new Response(serverResponse.getBody(), {
        status: serverResponse.getStatusCode(),
        statusText: serverResponse.getStatusMessage(),
        headers: serverResponse.cloneHeaders(),
      });

      if (this.afterResponse) {
        this.afterResponse(req, response);
      }

      return response;
    } else {
      logError(new Error(`Request pending: ${req.url}`));
    }
  }

  private guards: Guard[] = [];

  addGuard(guard: Guard) {
    if (!this.guards.includes(guard)) {
      this.guards.push(guard);
    }
  }
}
