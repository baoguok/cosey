import { createFakeFetch } from './FakeFetch';
import { createFakeXMLHttpRequest } from './FakeXMLHttpRequest';
import { type NetworkConfig } from './Network';
import { RequestInterceptor } from './RequestInterceptor';
import { ServerRequest } from './ServerRequest';
import { ServerResponse } from './ServerResponse';
import { interceptImage } from './interceptFile';
import { mapStatusCodeMessage, type StatusCode } from './mapStatusCodeMessage';

export interface RequestInterceptorInit {
  network?: NetworkConfig;
  prefix?: string;
}

function createRequestInterceptor(init?: RequestInterceptorInit) {
  const { network, prefix } = init || {};
  const requestInterceptor = new RequestInterceptor({
    prefix,
  });

  window.XMLHttpRequest = createFakeXMLHttpRequest(requestInterceptor, network);
  window.fetch = createFakeFetch(requestInterceptor, network);

  return requestInterceptor;
}

export {
  createRequestInterceptor,
  mapStatusCodeMessage,
  RequestInterceptor,
  ServerRequest,
  ServerResponse,
  type StatusCode,
  interceptImage,
};
