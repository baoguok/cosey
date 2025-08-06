import dayjs from 'dayjs';

export const YEAR_FORMAT = 'YYYY';
export const MONTH_FORMAT = YEAR_FORMAT + '-MM';
export const DATE_FORMAT = MONTH_FORMAT + '-DD';
export const TIME_FORMAT = 'HH:mm:ss';
export const DATE_TIME_FORMAT = DATE_FORMAT + ' ' + TIME_FORMAT;

/**
 * 根据传递参数获取dayjs对象，参数可以为 Unix 时间戳
 */
export function getDayjs(date?: Parameters<typeof dayjs>[0]) {
  if (typeof date === 'number' && String(date).length === 10) {
    date = date * 1000;
  }
  return dayjs(date);
}

/**
 * 格式化为“年月日 时分秒”
 */
export function formatToDateTime(date?: Parameters<typeof dayjs>[0]): string {
  return getDayjs(date).format(DATE_TIME_FORMAT);
}

/**
 * 格式化为“年月日”
 */
export function formatToDate(date?: Parameters<typeof dayjs>[0]): string {
  return getDayjs(date).format(DATE_FORMAT);
}

/**
 * 格式化为基础格式的日期+时间，即未添加分隔符的格式
 */
export function formatAsBasicDateTime(date?: Parameters<typeof dayjs>[0]) {
  return getDayjs(date).format('YYYYMMDDHHmmss');
}
