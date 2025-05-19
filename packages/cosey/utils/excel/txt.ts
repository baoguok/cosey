import { aoa2csv } from './csv';
import { WorkBook } from './workBook';

/**
 * 将二维数组转换为 txt 字符串
 */
export function aoa2txt(aoa: string[][]) {
  return aoa2csv(aoa, '\t');
}

/**
 * 将 WorkSheet 转换为 txt 字符串
 */
export function wb2txt(wb: WorkBook) {
  const aoa = wb.sheets[0].sheet.map((row) => {
    return row.map((cell) => {
      return cell?.value ?? '';
    });
  });
  return aoa2txt(aoa);
}
