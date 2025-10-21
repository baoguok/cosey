import { defineComponent } from 'vue';

export const LinkComponent = defineComponent({
  props: {
    url: {
      type: String,
    },
    target: {
      type: String,
    },
  },
  setup(props, { slots }) {
    return () => {
      return (
        <a href={props.url} target={props.target}>
          {slots.default?.()}
        </a>
      );
    };
  },
});
