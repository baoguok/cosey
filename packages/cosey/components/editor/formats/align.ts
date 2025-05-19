import Quill from 'quill';

const AlignStyle = Quill.import('attributors/style/align') as any;
AlignStyle.whitelist = ['left', 'right', 'center', 'justify'];

export { AlignStyle };
