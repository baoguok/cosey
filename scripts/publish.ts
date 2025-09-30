import path from 'node:path';
import child_process from 'node:child_process';

import { distDir } from './utils/const';
import { flow, selectPackage, type Steps } from './utils/flow';

let pkgName = '';
let pkgDistDir = '';

const npmRegistry = 'https://registry.npmjs.org/';

async function doPublish() {
  return new Promise(() => {
    child_process.spawn(
      `npm`,
      ['publish', '--access', 'public', '--registry', npmRegistry, '-ws=false'],
      {
        stdio: 'inherit',
        cwd: pkgDistDir,
        shell: true,
      },
    );
  });
}

async function publish() {
  pkgName = await selectPackage();
  pkgDistDir = path.resolve(distDir, pkgName);

  const steps: Steps = [[doPublish, `发布 npm 包`]];

  await flow(steps);
}

publish();
