import Persist from '@gunny/persist';
import { defaultPersistConfig, PersistConfig } from '../config/persist';
import { defaultsDeep } from 'lodash-es';

export let persist: Persist;

export function launchPersist(config: PersistConfig) {
  const { name, type } = defaultsDeep(config, defaultPersistConfig);

  persist = new Persist(name, { type });
}
