import { zip } from 'lodash-es';
import { getSolidColor } from '../../theme/themes/default/colorAlgorithm';
import { defaultPresetColors } from '../../theme/themes/seed';
import generate from '../../theme/themes/shared/generate';

export const colorNames = [
  'red',
  'volcano',
  'orange',
  'gold',
  'yellow',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
  'magenta',
] as const;

const levels = [2, 4, 6, 8] as const;

export const neutralColors = Array(colorNames.length)
  .fill(0)
  .map((_, i, arr) => {
    return getSolidColor('#fff', (i / (arr.length - 1)) * 100);
  });

export const colorPalettes = zip(
  ...colorNames.map((name, i) => {
    const baseColor = defaultPresetColors[name];
    const colors = generate(baseColor);

    return levels
      .map((level) => {
        return colors[level];
      })
      .concat(neutralColors[i]);
  }),
) as string[][];
