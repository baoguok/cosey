import { inject, provide, ref } from 'vue';

interface SubInstance {
  show: () => void;
  hide: () => void;
}

interface SubContext {
  addSub: (sub: SubInstance) => void;
  removeSub: (sub: SubInstance) => void;
  showSub: (sub: SubInstance) => void;
  hideSub: (sub: SubInstance) => void;
}

export const subContextSymbol = Symbol('subContext');

export function useSubProvide() {
  const subs = ref<SubInstance[]>([]);

  const addSub = (sub: SubInstance) => {
    if (!subs.value.includes(sub)) {
      subs.value.push(sub);
    }
  };

  const removeSub = (sub: SubInstance) => {
    const index = subs.value.indexOf(sub);
    if (index !== -1) {
      subs.value.splice(index, 1);
    }
  };

  const showSub = (sub: SubInstance) => {
    sub.show();
    subs.value.forEach((item) => {
      if (item !== sub) {
        item.hide();
      }
    });
  };

  const hideSub = (sub: SubInstance) => {
    sub.hide();
  };

  const context = {
    addSub,
    removeSub,
    showSub,
    hideSub,
  };

  provide<SubContext>(subContextSymbol, context);
}

export function useSubInject() {
  return inject<SubContext>(subContextSymbol)!;
}
