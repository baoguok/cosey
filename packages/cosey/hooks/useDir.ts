import { type MaybeRef, readonly, ref, unref, watch } from 'vue';
import { useLocale } from './useLocale';
import { getDir } from '../utils';

export function useDir(el?: MaybeRef<HTMLElement | null | undefined> | null) {
  const { lang } = useLocale();

  const dir = ref('');

  watch(lang, () => {
    dir.value = getDir(unref(el));
  });

  watch(
    () => unref(el),
    () => {
      dir.value = getDir(unref(el));
    },
  );

  return readonly(dir);
}
