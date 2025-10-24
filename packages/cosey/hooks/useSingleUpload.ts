import { type MaybeRefOrGetter, readonly, ref, toValue } from 'vue';
import { injectUploadConfig } from '../config/upload';
import { AxiosRequestConfig } from 'axios';
import { warningOnce } from '../utils';

type UploadStatus = 'unsent' | 'senting' | 'success' | 'error';

interface UseUploadOptions {
  onProgress?: (progress: number) => void;
  onSuccess?: (url: string) => void;
  onError?: (err: any) => void;
}

export function useSingleUpload(
  file: MaybeRefOrGetter<File | undefined | null>,
  options: UseUploadOptions = {},
  requestConfig?: AxiosRequestConfig<any>,
  requestExtra?: Record<PropertyKey, any>,
) {
  const { onProgress, onSuccess, onError } = options;

  const status = ref<UploadStatus>('unsent');
  const progress = ref(0);

  const { request } = injectUploadConfig() || {};

  if (!request) {
    warningOnce(!!request, 'The "request" api is required.');
  }

  let controller: AbortController | null = null;

  const cancel = () => {
    if (status.value === 'senting') {
      controller?.abort();
    }
  };

  const sent = async () => {
    try {
      const _file = toValue(file);
      if (!_file) {
        throw new Error('file is required');
      }

      status.value = 'senting';
      progress.value = 0;

      controller = new AbortController();

      const url = await new Promise<string>((resolve, reject) => {
        return request?.(
          _file,
          {
            ...requestConfig,
            signal: controller!.signal,
            onUploadProgress(event) {
              if (event.total) {
                progress.value = Math.floor((event.loaded / event.total) * 100);
                onProgress?.(progress.value);
              }
              requestConfig?.onUploadProgress?.(event);
            },
          },
          requestExtra,
        )
          .then((url) => {
            resolve(url);
          })
          .catch((err) => {
            reject(err);
          });
      });

      status.value = 'success';
      onSuccess?.(url);
    } catch (err) {
      status.value = 'error';
      onError?.(err);
    }
  };

  return {
    sent,
    cancel,
    status: readonly(status),
    progress: readonly(progress),
  };
}
