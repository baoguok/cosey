import type { ExportBookFormat, ExportBookType } from './type';

export const bookFormats: ExportBookFormat[] = [
  {
    type: 'csv',
    ext: '.csv',
    sheets: 'single',
    label: 'CSV (逗号分隔)',
    mime: 'text/csv',
  },
  {
    type: 'xlsx',
    ext: '.xlsx',
    sheets: 'multi',
    label: 'Microsoft Excel 文件',
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  {
    type: 'html',
    ext: '.html',
    sheets: 'single',
    label: '网页文件',
    mime: 'text/html',
  },
  {
    type: 'xml',
    ext: '.xml',
    sheets: 'single',
    label: 'XML 表格',
    mime: 'application/xml',
  },
  {
    type: 'txt',
    ext: '.txt',
    sheets: 'single',
    label: 'Unicode 文本',
    mime: 'text/plain',
  },
];

/**
 * 根据 bookType 获取扩展名
 */
export function getExtByBookType(bookType: ExportBookType) {
  return bookFormats.find((item) => item.type === bookType)!.ext;
}

/**
 * 根据 bookType 获取 mime 类型
 */
export function getMimeByBookType(bookType: ExportBookType) {
  return bookFormats.find((item) => item.type === bookType)!.mime;
}
