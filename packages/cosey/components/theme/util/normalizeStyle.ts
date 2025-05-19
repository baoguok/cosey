import { compile, serialize, stringify } from 'stylis';

export function normalizeStyle(styleStr: string): string {
  const serialized = serialize(compile(styleStr), stringify);
  return serialized.replace(/\{%%%:[^;];}/g, ';');
}
