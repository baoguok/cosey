import type { Ref } from 'vue';
import { computed } from 'vue';
import { type ComponentTokenMap, type ThemeConfig, seedToken } from '../theme';

export default function useMergeTheme(
  theme?: Ref<ThemeConfig | undefined>,
  parentTheme?: Ref<ThemeConfig | undefined>,
) {
  const themeConfig = computed(() => theme?.value || {});
  const parentThemeConfig = computed<ThemeConfig>(() =>
    themeConfig.value.inherit === false || !parentTheme?.value
      ? {
          token: seedToken,
        }
      : parentTheme.value,
  );

  const mergedTheme = computed(() => {
    if (!theme?.value) {
      return parentTheme?.value;
    }

    // Override
    const mergedComponents = {
      ...parentThemeConfig.value.components,
    };

    Object.keys(theme.value.components || {}).forEach((componentName) => {
      mergedComponents[componentName as keyof ComponentTokenMap] = {
        ...mergedComponents[componentName as keyof ComponentTokenMap],
        ...theme.value!.components![componentName as keyof ComponentTokenMap],
      } as any;
    });

    // Base token
    return {
      ...parentThemeConfig.value,
      ...themeConfig.value,

      token: {
        ...parentThemeConfig.value.token,
        ...themeConfig.value.token,
      },
      components: mergedComponents,
    };
  });

  return mergedTheme;
}
