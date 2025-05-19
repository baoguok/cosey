/**
 * 限定数值范围
 */
export function minmax(n: number, min: number, max: number): number {
  return n < min ? min : n > max ? max : n;
}
