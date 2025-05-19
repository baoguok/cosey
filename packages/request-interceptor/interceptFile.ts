function shouldIntercept(url: string) {
  return !/^(?:https?:\/\/|data:([^/]+)\/[^;]+;base64,|blob:)/.test(url);
}

/**
 * 拦截浏览器对图片地址的设置，将符合代理条件的地址替换为本地仓库保存的 base64 地址。
 */
export function interceptImage(callback: (url: string) => any | Promise<any>) {
  Object.defineProperty(HTMLImageElement.prototype, 'src', {
    async set(value) {
      if (shouldIntercept(value)) {
        const result = await callback(value);
        if (typeof result === 'string') {
          value = result;
        }
      }
      this.setAttribute('src', value);
    },
  });

  const observer = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        mutation.addedNodes.forEach(async (node) => {
          if (node instanceof Element && node.tagName === 'IMG') {
            const src = (node as HTMLImageElement).src.replace(/^https?:\/\/.*?\//, '/');
            if (shouldIntercept(src)) {
              const result = await callback(src);
              if (typeof result === 'string') {
                (node as HTMLImageElement).setAttribute('src', result);
              }
            }
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
