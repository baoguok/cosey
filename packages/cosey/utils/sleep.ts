export function sleep(wait: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, wait);
  });
}
