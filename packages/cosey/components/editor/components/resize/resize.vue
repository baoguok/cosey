<template>
  <div
    ref="overlay"
    :class="[
      hashId,
      prefixCls,
      {
        'is-show': visible,
      },
    ]"
    :style="overlayStyle"
  >
    <div
      v-for="corner in corners"
      :key="corner"
      :class="[`${prefixCls}-corner`, `${prefixCls}-corner-${corner}`]"
      @pointerdown="onPointerDown(corner, $event)"
      @pointermove="onPointerMove(corner, $event)"
      @pointerup="onPointerUp(corner)"
      @pointercancel="onPointerUp(corner)"
    ></div>
    <div :class="`${prefixCls}-align`">
      <ButtonGroup>
        <Button
          v-for="align in aligns"
          :key="align"
          :active="align === currentAlign"
          @click="onAlignClick(align)"
        >
          <Icon :name="mapIcons[align]" />
        </Button>
      </ButtonGroup>
    </div>
    <div
      :class="[
        `${prefixCls}-size`,
        {
          'is-outside': isOutSize,
        },
      ]"
    >
      {{ displaySize }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, onBeforeUnmount, onMounted, ref, shallowRef, useTemplateRef, watch } from 'vue';
import Quill, { Parchment } from 'quill';
import { useRectObserver } from '../../../../hooks';
import useStyle from './resize.style';
import { useComponentConfig } from '../../../config-provider';
import {
  getAlign,
  mapIcons,
  onDrag,
  Rect,
  ResizeAlign,
  ResizePosition,
  setAlignStyle,
} from './resize';
import { Icon } from '../../../icon';
import Button from '../button.vue';
import ButtonGroup from '../button-group.vue';
import { editorContextKey } from '../../quillContext';

const { prefixCls } = useComponentConfig('editor-resize');
const { hashId } = useStyle(prefixCls);

const overlayEl = useTemplateRef('overlay');

const { quill } = inject(editorContextKey)!;

const visible = ref(false);

const target = shallowRef<HTMLElement | null>(null);

const currentAlign = ref<ResizeAlign | null>(null);

const corners: ResizePosition[] = ['nw', 'ne', 'sw', 'se'];
const aligns: ResizeAlign[] = ['left', 'center', 'right'];

const downs: { [K in ResizePosition]?: boolean } = {};

let downRect: Rect | null = null;

const displaySize = ref('');
const isOutSize = ref(false);

const overlayStyle = ref();

const setOverlayRect = (rect: Rect) => {
  const parent = overlayEl.value?.offsetParent;
  if (parent) {
    const parentRect = parent.getBoundingClientRect();

    const width = ~~rect.width;
    const height = ~~rect.height;

    overlayStyle.value = {
      insetInlineStart: ~~(rect.x - parentRect.x) + 'px',
      insetBlockStart: ~~(rect.y - parentRect.y) + 'px',
      width: width + 'px',
      height: height + 'px',
    };
    displaySize.value = `${width} x ${height}`;
    isOutSize.value = width < 64;
  }
};

useRectObserver(target, (rect) => {
  setOverlayRect(rect);
});

const onPointerDown = (corner: ResizePosition, event: PointerEvent) => {
  downs[corner] = true;
  const el = event.currentTarget as HTMLElement;
  el.setPointerCapture(event.pointerId);

  downRect = target.value!.getBoundingClientRect();
};

const onPointerMove = (corner: ResizePosition, event: PointerEvent) => {
  if (downs[corner]) {
    const rect = target.value!.getBoundingClientRect();
    onDrag(downRect!, rect, {
      position: corner,
      x: event.clientX,
      y: event.clientY,
      min: 16,
      max: Infinity,
      cb: (rect) => {
        target.value!.setAttribute('width', `${~~rect.width}`);
        target.value!.setAttribute('height', `${~~rect.height}`);
      },
    });
  }
};

const onPointerUp = (corner: ResizePosition) => {
  downs[corner] = false;
};

const onAlignClick = (align: ResizeAlign) => {
  if (align === currentAlign.value) {
    currentAlign.value = null;
  } else {
    currentAlign.value = align;
  }

  setAlignStyle(target.value!, currentAlign.value);
};

watch(
  () => target.value,
  () => {
    if (target.value) {
      currentAlign.value = getAlign(target.value);
    }
  },
);

const show = (el: HTMLElement) => {
  target.value = el;
  const blot = Quill.find(el) as Parchment.Blot;
  const index = quill.value!.getIndex(blot);
  quill.value!.setSelection(index + 1);
  quill.value!.setSelection(null);
  visible.value = true;
};

const hide = () => {
  if (visible.value) {
    target.value = null;
    visible.value = false;
  }
};

const onDocMouseDown = (event: MouseEvent) => {
  const el = event.target as HTMLElement;

  if (target.value && (el === target.value || overlayEl.value!.contains(el))) {
    return;
  }

  if (['img', 'video'].includes(el.tagName.toLowerCase()) && quill.value!.container.contains(el)) {
    if (target.value) {
      hide();
    }
    show(el);
    return;
  }

  hide();
};

const onDocKeyDown = (event: KeyboardEvent) => {
  if (!target.value) {
    return;
  }
  event.preventDefault();

  const blot = Quill.find(target.value) as Parchment.Blot;
  let index = quill.value!.getIndex(blot);

  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      break;
    case 'ArrowRight':
    case 'ArrowDown':
      index += 1;
      break;
    case 'Backspace':
    case 'Delete':
      quill.value!.deleteText(index, 1);
      break;
    default:
      return;
  }

  hide();

  setTimeout(() => {
    quill.value!.setSelection(index);
  });
};

onMounted(() => {
  document.addEventListener('mousedown', onDocMouseDown, false);
  document.addEventListener('keydown', onDocKeyDown, false);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocMouseDown, false);
  document.removeEventListener('keydown', onDocKeyDown, false);
});
</script>
