import { type Router } from 'vue-router';
import { registerProgressGuard } from './progress';
import { registerAuthGuard } from './auth';

export function registerRouterGuard(router: Router) {
  registerProgressGuard(router);
  registerAuthGuard(router);
}
