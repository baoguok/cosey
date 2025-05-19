import MergedLayoutNotFound from '../layout/merged/layout-not-found';
import { defineRoute } from './utils';

export const NOT_FOUND_ROUTE_NAME = 'ExceptionNotFound';

export const NotFoundRoute = defineRoute({
  path: '/:pathMatch(.*)*',
  name: NOT_FOUND_ROUTE_NAME,
  component: MergedLayoutNotFound,
  meta: {
    title: 'Not Found',
  },
});
