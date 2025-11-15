import { ref, Ref } from 'vue';
import { usePersist } from '../../../hooks';

const historyColorKey = 'Cosey:historyColor';

let historyColors: Ref<string[]> | null = null;

export function useHistoryColor() {
  const persist = usePersist();

  if (!historyColors) {
    historyColors = ref(persist.get(historyColorKey) || []);
  }

  const pushHistory = (color: string) => {
    const hist = historyColors!.value;
    if (hist.includes(color)) {
      hist.splice(hist.indexOf(color), 1);
    }
    hist.unshift(color);
    persist.set(historyColorKey, historyColors!.value);
  };

  return {
    historyColors,
    pushHistory,
  };
}
