/**
 * 模拟网络的质量和性能，包括带宽、延迟。
 */

export interface NetworkConfig {
  // 上行速度，字节/秒
  uplink?: number;
  // 下行速度，字节/秒
  downlink?: number;
}

export class Network {
  static defaultConfig: Required<NetworkConfig> = {
    uplink: 30 * 1024,
    downlink: 60 * 1024,
  };

  config: Required<NetworkConfig>;

  constructor(config?: NetworkConfig) {
    this.config = Object.assign(Network.defaultConfig, config);
  }

  async mergeReadableStream(stream: ReadableStream<Uint8Array> | null) {
    if (!stream) {
      return new Uint8Array(0);
    }

    let chunks: number[] = [];
    const reader = stream.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks = chunks.concat(...value);
    }

    return new Uint8Array(chunks);
  }

  timer: ReturnType<typeof setTimeout> | null = null;

  isTransmitting() {
    return !!this.timer;
  }

  stopTransmitting() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  async simulatedLowSpeed(total: number, speed: number, progress: (loaded: number) => void) {
    const seconds = total / speed;
    const interval = 500;
    const time = Math.ceil((seconds * 1000) / interval);
    const chunkSize = total / time;
    let loaded = 0;

    progress(loaded);

    for (let i = 1; i <= time; i++) {
      await new Promise<void>((resolve) => {
        this.timer = setTimeout(() => {
          this.timer = null;
          resolve();
        }, interval);
      });
      loaded = Math.min(i * chunkSize, total);
      progress(loaded);
    }
  }

  async upload(total: number, progress: (loaded: number) => void) {
    return this.simulatedLowSpeed(total, this.config.uplink, progress);
  }

  async download(total: number, progress: (loaded: number) => void) {
    return this.simulatedLowSpeed(total, this.config.downlink, progress);
  }
}
