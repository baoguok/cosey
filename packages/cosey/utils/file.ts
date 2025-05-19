import { isString } from './is';

let input: HTMLInputElement;

export interface ChooseFilesOptions {
  multiple?: boolean;
  accept?: string;
}

/**
 * 选择文件
 */
export function chooseFiles(options: ChooseFilesOptions = {}) {
  if (!input) {
    input = document.createElement('input');
    input.type = 'file';
    input.style.cssText = 'position: fixed; z-index: -10; opacity: 0; pointer-events: none';
  }

  input.multiple = !!options.multiple;
  input.setAttribute('accept', options.accept || '');

  return new Promise<File[]>((resolve) => {
    input.onchange = () => {
      const files = [...(input.files as unknown as File[])];
      resolve(files);
      input.value = '';
    };

    input.click();
  });
}

/**
 * 从 url 或 File 对象中推测文件 mime 主类型或特殊子类型，
 * 例如：image, video, audio, zip等
 */
export function getFileType(urlOrFile: string | File) {
  let url = '';

  if (isString(urlOrFile)) {
    url = urlOrFile;
  } else if (urlOrFile instanceof File) {
    if (urlOrFile.type) {
      const [cate, subCate] = urlOrFile.type.split('/');
      if (['zip'].includes(subCate)) {
        return subCate;
      }
      return cate;
    }
    url = urlOrFile.name;
  }

  const execArray = /^data:([^/]+)\/[^;]+;base64,/.exec(url);
  if (execArray) {
    return execArray[1];
  }

  const suffix = url.replace(/\?.*$/, '').match(/\.([a-zA-Z0-9]+)$/)?.[1] || '';
  if (/^(?:jpe?g|png|gif|webp|bmp|svg)$/i.test(suffix)) {
    return 'image';
  }
  if (/^(?:avi|wmv|mpg|mpeg|mov|rm|ram|swf|flv|mp4|webm|ogm)$/i.test(suffix)) {
    return 'video';
  }
  if (/^(?:mp3|wav|mid|aif|aiff|wma|ra|vqf|m4a|aac|midi|ogg|au|voc)$/i.test(suffix)) {
    return 'audio';
  }
  return suffix;
}

export function readAsDataURL(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}

export function readAsArrayBuffer(file: File) {
  return new Promise<ArrayBuffer>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as ArrayBuffer);
    };
    reader.readAsArrayBuffer(file);
  });
}
