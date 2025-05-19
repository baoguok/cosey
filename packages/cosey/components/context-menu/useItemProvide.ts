import { computed, inject, provide, Ref, ref } from 'vue';

interface ItemInstance {
  icon: boolean;
  hide?: () => void;
}

interface ItemContext {
  addItem: (item: ItemInstance) => void;
  removeItem: (item: ItemInstance) => void;
  select: (command: any) => void;
  withIcon: Ref<boolean>;
  enter: (item: ItemInstance) => void;
  leave: () => void;
}

interface UseItemProvideOptions {
  onSelect?: (command: any) => void;
  onEnter?: () => void;
  onLeave?: () => void;
}

const itemContextSymbol = Symbol('itemContext');

export function useItemProvide(options?: UseItemProvideOptions) {
  const items = ref<ItemInstance[]>([]);

  const withIcon = computed(() => {
    return items.value.some((item) => item.icon);
  });

  const addItem = (item: ItemInstance) => {
    if (!items.value.includes(item)) {
      items.value.push(item);
    }
  };

  const removeItem = (item: ItemInstance) => {
    const index = items.value.indexOf(item);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  };

  const select = (command: any) => {
    options?.onSelect?.(command);
  };

  const enter = (ins: ItemInstance) => {
    options?.onEnter?.();

    items.value.forEach((item) => {
      if (item !== ins) {
        item.hide?.();
      }
    });
  };

  const leave = () => {
    options?.onLeave?.();
  };

  const context = {
    addItem,
    removeItem,
    select,
    withIcon,
    enter,
    leave,
  };

  provide<ItemContext>(itemContextSymbol, context);
}

export function useItemInject() {
  return inject<ItemContext>(itemContextSymbol)!;
}
