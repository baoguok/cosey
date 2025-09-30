import { getExtByBookType, getMimeByBookType, bookFormats } from './bookFormats';
import type { ExportBookType, ExportExcelScheme } from './type';
import { aoa2sheet } from './utils';
import { Cell, WorkBook } from './workBook';
import { wb2html } from './html';
import { wb2xlsx } from './xlsx';
import { wb2xml } from './xml';
import { wb2csv } from './csv';
import { wb2txt } from './txt';
import { type MayBeTableColumnProps, type TableColumnProps } from '../../components';
import { isObject } from '../is';

/**
 * 根据提供的 url 下载文件
 */
function downloadByUrl(url: string, filename: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 根据内容和mime类型生成 Blob
 */
function createBlob(content: string, mimeType: string) {
  const blob = new Blob([content], {
    type: mimeType,
  });
  return blob;
}

/**
 * 根据 Blob 下载文件
 */
function downloadByBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  downloadByUrl(url, filename);
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 60000);
}

/**
 * 根据字符串下载文件
 */
function downloadByString(string: string, filename: string, mimeType: string) {
  const blob = createBlob(string, mimeType);
  downloadByBlob(blob, filename);
}

/**
 * 写入本地文件
 */
async function writeFile(wb: WorkBook, bookType: ExportBookType) {
  const mime = getMimeByBookType(bookType);

  if (bookType === 'xlsx') {
    const blob = await wb2xlsx(wb, mime);
    downloadByBlob(blob, wb.name);
    return;
  }

  let content = '';

  switch (bookType) {
    case 'csv':
      content = wb2csv(wb);
      break;
    case 'txt':
      content = wb2txt(wb);
      break;
    case 'xml':
      content = wb2xml(wb);
      break;
    case 'html':
      content = wb2html(wb);
      break;
  }
  downloadByString(content, wb.name, mime);
}

/**
 * 只取最底层的列组成表头
 */
export function flatColumns(columns: MayBeTableColumnProps[]) {
  return columns
    .reduce((result, column): MayBeTableColumnProps[] => {
      return result.concat(
        isObject(column) && Array.isArray(column.columns) ? flatColumns(column.columns) : column,
      );
    }, [] as MayBeTableColumnProps[])
    .filter(isObject) as TableColumnProps[];
}

/**
 * 将 columns 转换为二维数组
 */
function columns2aoa(columns: TableColumnProps[]) {
  let aoa: Cell[][] = [];

  let colIndex = 0;
  function recurColumns(columns: TableColumnProps[], rowIndex = 0) {
    const row = (aoa[rowIndex] ??= []);

    let mergedColSpan = 0;

    const children = columns.map((column, index) => {
      const cell = new Cell(column.label);
      cell.colIndex = colIndex;
      cell.rowIndex = rowIndex;
      cell.isHeader = true;
      row[colIndex] = cell;

      let colSpan = 1;
      if (column.columns?.length) {
        const result = recurColumns(column.columns, rowIndex + 1);
        colSpan = result.mergedColSpan;
        cell.children = result.children;
      }

      cell.colSpan = colSpan;

      mergedColSpan += colSpan;

      if (index !== columns.length - 1) {
        colIndex++;
      }
      return cell;
    });

    return {
      mergedColSpan,
      children,
    };
  }

  recurColumns(columns);

  const rowCount = aoa.length;

  if (rowCount > 1) {
    aoa.forEach((row, rowIndex) => {
      row.forEach((cell) => {
        cell.rowSpan = cell.children ? 1 : rowCount - rowIndex;
      });
    });

    aoa = aoa.map((row) => {
      return [...row].map((cell) => {
        if (!cell) {
          cell = new Cell();
          cell.isEmpty = true;
          cell.isHeader = true;
        }
        return cell;
      });
    });
  }

  return aoa;
}

/**
 * 将 columns 最后一级转换为二维数组
 */
function columns2lastLevelAoa(columns: TableColumnProps[]) {
  return [
    columns.map((column) => {
      const cell = new Cell(column.label);
      cell.isHeader = true;
      return cell;
    }),
  ];
}

export interface ExportExcelOptions {
  footerCount?: number;
}

/**
 * 根据数据和配置，导出 excel 文件
 */
async function exportExcel(
  scheme: ExportExcelScheme,
  data:
    | Record<string, any>[]
    | {
        [sheetName: string]: Record<string, any>[];
      },
  options?: ExportExcelOptions,
) {
  const { footerCount = 0 } = options || {};
  const worksheets = scheme.worksheet ? [scheme.worksheet] : scheme.worksheets || [];

  const bookType = scheme.bookType || 'csv';
  const filename = scheme.filename + getExtByBookType(bookType);

  const workBook = new WorkBook(filename);

  worksheets.forEach((sheet) => {
    const { name, columns, transform, noGroup, noHead } = sheet;

    const fColumns = flatColumns(columns);

    const ooa = Array.isArray(data) ? data : data[name];

    let aoa = ooa.map((obj, index) =>
      fColumns.map((column, colIndex) => {
        if (index < ooa.length - footerCount) {
          if (column.type === 'index') {
            return index + 1;
          } else {
            const value = obj[column.prop as string];
            return transform ? transform(obj, column, value, index) : value;
          }
        } else {
          return obj[colIndex];
        }
      }),
    );

    let headAoa: Cell[][] = [];
    if (!noHead) {
      headAoa = noGroup ? columns2lastLevelAoa(fColumns) : columns2aoa(columns);
      aoa = headAoa.concat(aoa);
    }

    const workSheet = aoa2sheet(name, aoa);

    workSheet.headRowCount = headAoa.length;

    workBook.addSheet(workSheet);
  });

  await writeFile(workBook, bookType);
}

export { bookFormats, exportExcel };

export type { ExportBookType, ExportExcelScheme };
