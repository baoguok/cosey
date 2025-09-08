import { withInstall } from '../utils';
import Upload from './upload';

export * from './upload.api';
export * from '../upload-context';

const _Upload = withInstall(Upload);

export { _Upload as Upload };
export default _Upload;
