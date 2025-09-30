import { withInstall } from '../utils';
import EditorV2 from './editor-v2';

export * from './editor-v2.api';

const _EditorV2 = withInstall(EditorV2);

export { _EditorV2 as EditorV2 };
export default _EditorV2;
