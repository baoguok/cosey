import { isShallowEqual, toArray } from '../../utils';
import type { AliasToken, GlobalToken, OverrideToken } from './interface';
import defaultDerivative from './themes/default';
import seedToken from './themes/seed';
import formatToken from './util/alias';
import { type MappingAlgorithm } from './theme-context';

class CacheToken {
  cache: [
    token: Partial<AliasToken> | undefined,
    algorithm: MappingAlgorithm | MappingAlgorithm[] | undefined,
    components: OverrideToken | undefined,
    token: GlobalToken,
  ][] = [];

  getToken(
    token?: Partial<AliasToken>,
    algorithm?: MappingAlgorithm | MappingAlgorithm[],
    components?: OverrideToken,
  ) {
    const result = this.cache.find(([_token, algorithm$, components$]) => {
      if (isShallowEqual([_token, algorithm$, components$], [token, algorithm, components])) {
        return true;
      }
    });
    if (result) {
      return result[3];
    } else {
      const derivatives = toArray(algorithm || defaultDerivative);
      const mergedSeedToken = {
        ...seedToken,
        ...token,
      };
      const mapToken = derivatives.reduce(
        (result, derivative) => derivative(mergedSeedToken, result),
        undefined as any,
      );
      const aliasToken = formatToken(mapToken);

      const mergedToken: GlobalToken = {
        ...token,
        ...aliasToken,
        ...components,
      };
      this.cache.push([token, algorithm, components, mergedToken]);
      return mergedToken;
    }
  }
}

export const createCacheToken = () => {
  return new CacheToken();
};
