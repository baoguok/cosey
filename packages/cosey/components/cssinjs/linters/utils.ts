import { warningOnce } from '../../../utils';
import type { LinterInfo } from './interface';

export function lintWarning(message: string, info: LinterInfo) {
  const { path, parentSelectors } = info;

  warningOnce(
    false,
    `[cosey cssinjs] ${path ? `Error in '${path}': ` : ''}${message}${
      parentSelectors.length ? ` Selector info: ${parentSelectors.join(' -> ')}` : ''
    }`,
  );
}
