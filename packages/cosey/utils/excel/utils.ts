import type { CellAddress, Range } from './type';
import { Cell, WorkSheet } from './workBook';

/**
 * 将二维数组转换为 WorkSheet
 */
export function aoa2sheet(sheetName: string, aoa: any[][]) {
  const sheet = new WorkSheet(sheetName);

  aoa.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      sheet.setCell(colIndex, rowIndex, value instanceof Cell ? value : new Cell(value));
    });
  });

  return sheet;
}

/**
 * 将 A1-Style 列解码为下标列
 */
export function decodeCol(col: string) {
  let c = 0;
  for (let i = 0; i < col.length; i++) {
    c = 26 * c + (col.charCodeAt(i) - 64);
  }
  return c - 1;
}

/**
 * 将 A1-Style 行解码为下标行
 */
export function decodeRow(row: string) {
  return parseInt(row) - 1;
}

/**
 * 将 A1-Style 单元格地址解码为行列下标对象
 */
export function decodeCell(address: string): CellAddress {
  let r = 0;
  let c = 0;
  for (let i = 0; i < address.length; i++) {
    const cc = address.charCodeAt(i);
    if (cc >= 48 && cc <= 57) {
      r = 10 * r + (cc - 48);
    } else if (cc >= 65 && cc <= 90) {
      c = 26 * c + (cc - 64);
    }
  }
  return {
    r: r - 1,
    c: c - 1,
  };
}

/**
 * 将 A1-Style 范围解码为下标单元格范围
 */
export function decodeRange(range: string): Range {
  const idx = range.indexOf(':');
  if (idx === -1) {
    return {
      s: decodeCell(range),
      e: decodeCell(range),
    };
  }
  return {
    s: decodeCell(range.slice(0, idx)),
    e: decodeCell(range.slice(idx + 1)),
  };
}

/**
 * 将下标列编码为 A1-Style 列
 */
export function encodeCol(col: number) {
  let c = '';

  for (col++; col; col = Math.floor(col / 26)) {
    c = String.fromCharCode((col % 26) + 64) + c;
  }
  return c;
}

/**
 * 将下标行编码为 A1-Style 行
 */
export function encodeRow(row: number) {
  return '' + (row + 1);
}

/**
 * 将下标单元格对象编码为 A1-Style 单元格地址
 */
export function encodeCell(cell: CellAddress) {
  return encodeCol(cell.c) + encodeRow(cell.r);
}

/**
 * 将下标单元格范围编码为 A1-Style 范围
 */
export function encodeRange(range: Range) {
  return encodeCell(range.s) + ':' + encodeCell(range.e);
}
