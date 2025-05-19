import { ref } from 'vue';

function useProdHMR() {
  return ref(false);
}

const viteHMR = ref(false);

function useDevHMR() {
  return viteHMR;
}

export default import.meta.env && import.meta.env.DEV ? useDevHMR : useProdHMR;

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    viteHMR.value = true;
  });
  import.meta.hot.on('vite:afterUpdate', () => {
    viteHMR.value = false;
  });
}
