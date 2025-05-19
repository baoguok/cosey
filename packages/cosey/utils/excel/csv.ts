import { WorkBook } from './workBook';

const CRLF = '\r\n';

/**
 * 将二维数组转换为 csv 字符串
 *
 * https://www.rfc-editor.org/rfc/rfc4180.html
 */
export function aoa2csv(aoa: string[][], FS = ',') {
  return aoa
    .map((fields) => {
      return fields
        .map((field) => {
          field = String(field).replace(/"/g, '""');
          return new RegExp(`[${FS}"\\n]`).test(field) ? `"${field}"` : field;
        })
        .join(FS);
    })
    .join(CRLF);
}

/**
 * 将 WorkBook 转换为 csv 字符串
 */
export function wb2csv(wb: WorkBook) {
  const aoa = wb.sheets[0].sheet.map((row) => {
    return row.map((cell) => {
      return cell?.value ?? '';
    });
  });
  return aoa2csv(aoa);
}
