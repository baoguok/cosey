import Quill, { Module } from 'quill';

class CustomList extends Module {
  constructor(quill: Quill) {
    super(quill);

    quill.keyboard.bindings['Enter'].unshift({
      key: 'Enter',
      format: ['olist', 'ulist'],
      collapsed: true,
      empty: true,
      handler(range, context) {
        const formats: Record<string, unknown> = { olist: false, ulist: false };
        if (context.format.indent) {
          formats.indent = false;
        }
        this.quill.formatLine(range.index, range.length, formats, Quill.sources.USER);
      },
    });
  }
}

export default CustomList;
