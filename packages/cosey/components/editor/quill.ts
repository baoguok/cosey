import Quill from 'quill';

import { ImageUploader } from './modules/image-uploader/image-uploader';
import CustomList from './modules/custom-list';

import { Formula } from './formats/formula';
import { SizeStyle } from './formats/size';
import { FontStyle } from './formats/font';
import { Link } from './formats/link';
import { AlignStyle } from './formats/align';
// import { IndentStyle } from './formats/indent';
import Video from './formats/video';
import Image from './formats/image';
// import List from './formats/list';
import Kbd from './formats/kbd';
import Table from './modules/table';

export function register() {
  Quill.register(
    {
      'modules/imageUploader': ImageUploader,
      'modules/customList': CustomList,
      'modules/table': Table,

      'formats/formula': Formula,
      'formats/size': SizeStyle,
      'formats/font': FontStyle,
      'formats/link': Link,
      'formats/align': AlignStyle,
      // 'formats/indent': IndentStyle,
      'formats/video': Video,
      'formats/image': Image,
      // 'formats/list': List,
      'formats/kbd': Kbd,
    },
    true,
  );
}
