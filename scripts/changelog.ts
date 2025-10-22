import { ConventionalChangelog } from 'conventional-changelog';
import fsp from 'node:fs/promises';
import path from 'node:path';
import shell from 'shelljs';

async function changelog() {
  let data = '';
  const generator = new ConventionalChangelog().readPackage().loadPreset('angular').options({
    releaseCount: 0,
  });

  for await (const chunk of generator.write()) {
    data += chunk;
  }

  await fsp.writeFile(path.resolve(process.cwd(), 'CHANGELOG.md'), data);

  shell.exec(`git commit -a -m 'build: changelog'`);
}

changelog();
