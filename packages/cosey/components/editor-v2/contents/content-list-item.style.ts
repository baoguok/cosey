import { getSimpleStyleHook } from '../../theme';
import { LIST_MAX_LEVEL } from '../plugins/list/utils';

function getAllLevelSelector(level: number) {
  return `:is(${Array(level)
    .fill(0)
    .map((_, i) => `.is-level-${i}`)
    .join(', ')})`;
}

function generateNumberedCounter(maxLevel: number) {
  return Array(maxLevel)
    .fill(0)
    .reduce((result, _, i) => {
      const counterName = `numbered-list${i}`;

      const selector = `&.is-level-${i}`;

      result[selector] = {
        counterIncrement: counterName,
        '&::before': {
          content: `counter(${counterName})"."`,
        },
      };

      if (i !== 0) {
        result[`${getAllLevelSelector(i)} + ${selector}`] = {
          counterReset: counterName,
        };
      }

      return result;
    }, {});
}

export default getSimpleStyleHook('CoEditorV2ListItem', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      '&::before': {
        position: 'absolute',
        top: '50%',
        left: 0,
        userSelect: 'none',
        pointerEvents: 'none',
        transform: 'translate(calc(-100% - 0.6em), -50%)',
      },
      '&.is-bulleted-list': {
        '&::before': {
          content: '""',
          width: '0.35em',
          height: '0.35em',
          backgroundColor: 'currentcolor',
          borderRadius: '50%',
        },
      },
      '&.is-numbered-list': generateNumberedCounter(LIST_MAX_LEVEL),
    },
  };
});
