import { withInstall } from '../utils';
import Editor from './editor';

export * from './editor.api';

const _Editor = withInstall(Editor);

export { _Editor as Editor };
export default _Editor;
