export type ContentType = 'image' | 'video' | 'audio' | 'text' | 'json' | 'file' | null;

export interface HttpMessage {
  name: string;
  normal: {
    url: string;
    method: string;
    status: {
      code: number;
      text: string;
    } | null;
  };
  payload: {
    searchParams: [string, string][] | null;
    body: any | null;
    type: ContentType;
  };
  req: {
    method: string;
    url: string;
    headers: [string, string][];
  } | null;
  res: {
    headers: [string, string][];
    body: any | null;
    type: ContentType;
  } | null;
}

export class HttpMessageManager extends EventTarget {
  httpMessageList: HttpMessage[] = [];

  private mapReqHttpMessage = new WeakMap<Request, HttpMessage>();

  clearHttpMessage() {
    this.httpMessageList = [];

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: [],
      }),
    );
  }

  async setRequest(req: Request) {
    const type = this.getMimeType(req);

    const httpMessage: HttpMessage = {
      name: req.url.split('/').pop() || '',
      normal: {
        method: req.method,
        url: req.url,
        status: null,
      },
      payload: {
        searchParams:
          req.method.toUpperCase() === 'GET' ? [...new URL(req.url).searchParams.entries()] : null,
        body: req.method.toUpperCase() !== 'GET' ? await this.getBody(req, type) : null,
        type,
      },
      req: {
        method: req.method,
        url: req.url,
        headers: [...req.headers.entries()],
      },
      res: null,
    };

    this.mapReqHttpMessage.set(req, httpMessage);
    this.httpMessageList.push(httpMessage);

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: [...this.httpMessageList],
      }),
    );
  }

  private getMimeType(obj: Response | Request) {
    const contentType = obj.headers.get('Content-Type');
    if (!contentType) {
      return null;
    }

    const mimeType = contentType.split('; ')[0];

    switch (mimeType) {
      case 'application/json':
        return 'json';
      case 'application/octet-stream':
        return 'file';
      default:
        if (/^image/.test(mimeType)) {
          return 'image';
        }
        if (/^audio/.test(mimeType)) {
          return 'audio';
        }
        if (/^video/.test(mimeType)) {
          return 'video';
        }
        if (/^text/.test(mimeType)) {
          return 'text';
        }
        return null;
    }
  }

  private async getBody(obj: Response | Request, type: ContentType) {
    const cloned = obj.clone();

    switch (type) {
      case 'audio':
        return await cloned.blob();
      case 'video':
        return await cloned.blob();
      case 'file':
        return await cloned.blob();
      case 'image':
        return await cloned.blob();
      case 'json':
        return await cloned.json();
      case 'text':
        return await cloned.text();
    }
  }

  async setResponse(req: Request, res: Response) {
    const httpMessage = this.mapReqHttpMessage.get(req);

    if (httpMessage) {
      httpMessage.normal.status = {
        code: res.status,
        text: res.statusText,
      };
      const type = this.getMimeType(res);
      httpMessage.res = {
        headers: [...res.headers.entries()],
        body: await this.getBody(res, type),
        type,
      };

      this.dispatchEvent(
        new CustomEvent('change', {
          detail: [...this.httpMessageList],
        }),
      );
    }
  }
}
