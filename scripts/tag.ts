import shell from 'shelljs';

import packageConfig from '../packages/cosey/package.json' with { type: 'json' };
import consola from 'consola';

const version = packageConfig.version;

export async function tag() {
  return new Promise<void>((resolve) => {
    shell.exec(
      `git tag v${version}`,
      {
        silent: true,
      },
      (...[code, , stderr]) => {
        if (code !== 0) {
          consola.error(stderr);
          shell.exit(1);
        } else {
          consola.success(`tag 'v${version}' created successfully`);
          resolve();
        }
      },
    );
  });
}

tag();
