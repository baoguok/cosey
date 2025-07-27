import path from 'node:path';
import fsp from 'node:fs/promises';
import child_process from 'node:child_process';
import consola from 'consola';
import { rimraf } from 'rimraf';
import { glob } from 'glob';
import fse, { copy } from 'fs-extra';

import { mapPackageDirName, packagesDir, distDir, dependenciesTypes } from './utils/const';
import { flow, selectPackage, type Steps } from './utils/flow';
import { compileAllScript } from './utils/transform';

let pkgName = '';
let pkgSrcDir = '';
let pkgDistDir = '';

async function checkType() {
  const vueTsconfig = {
    include: [`${pkgSrcDir}/**/*`],
    exclude: [`${pkgSrcDir}/**/node_modules/**/*`],
    compilerOptions: {
      target: 'ESNext',
      useDefineForClassFields: true,
      module: 'ESNext',
      lib: ['ESNext', 'DOM', 'DOM.Iterable'],
      skipLibCheck: true,
      types: ['vite/client', 'element-plus/global'],

      /* Bundler mode */
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      moduleDetection: 'force',
      noEmit: true,
      jsx: 'preserve',
      jsxImportSource: 'vue',

      /* Linting */
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true,
    },
  };

  const tsconfigPath = path.resolve(distDir, 'tsconfig.type-check.json');
  await fse.outputFile(tsconfigPath, JSON.stringify(vueTsconfig));

  const config = [['vue-tsc'], ['-p', tsconfigPath]].flat(Infinity).join(' ');

  await new Promise<void>((resolve, reject) => {
    const child = child_process.exec(`${config}`, async (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });

    child.stdout?.on('data', (data) => {
      consola.log(data);
    });
  });
}

async function deleteDistDir() {
  await rimraf(pkgDistDir);
  await fsp.mkdir(pkgDistDir, { recursive: true });
}

async function generateType() {
  const vueTsconfig = {
    include: [`${pkgSrcDir}/**/*`, `${pkgSrcDir}/**/*.d.ts`],
    exclude: [`${pkgSrcDir}/**/node_modules/**/*`],
    compilerOptions: {
      target: 'ESNext',
      module: 'ESNext',
      esModuleInterop: true,
      skipLibCheck: true,
      declaration: true,
      emitDeclarationOnly: true,
      outDir: pkgDistDir,
      types: ['vite/client'],

      /* Bundler mode */
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      isolatedModules: true,
      moduleDetection: 'force',
      jsx: 'preserve',
      jsxImportSource: 'vue',

      /* Linting */
      strict: true,
      noImplicitAny: false,
      noUnusedLocals: true,
      noUnusedParameters: true,
    },
  };

  const tsconfigPath = path.resolve(distDir, 'tsconfig.json');
  await fse.outputFile(tsconfigPath, JSON.stringify(vueTsconfig));

  const config = [['vue-tsc'], ['-p', tsconfigPath]].flat(Infinity).join(' ');

  await new Promise<void>((resolve, reject) => {
    const child = child_process.exec(`${config}`, async (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });

    child.stdout?.on('data', (data) => {
      consola.log(data);
    });
  });
}

async function getExternals() {
  const { default: pkgJson } = await import(path.resolve(pkgSrcDir, 'package.json'), {
    with: { type: 'json' },
  });

  return dependenciesTypes
    .map((key) => {
      return Object.keys(pkgJson[key] || {});
    })
    .flat(Infinity) as string[];
}

async function compile() {
  await compileAllScript({
    srcDir: pkgSrcDir,
    distDir: pkgDistDir,
    externals: await getExternals(),
  });
}

async function updateWorkspaceVersion(pkgJson: Record<string, any>) {
  for (const [key, value] of Object.entries(pkgJson)) {
    if (dependenciesTypes.includes(key)) {
      for (const [pkgName, ver] of Object.entries<string>(value)) {
        if (/^workspace:/.test(ver)) {
          const { default: pkgJson } = await import(
            path.resolve(
              packagesDir,
              mapPackageDirName[pkgName as keyof typeof mapPackageDirName],
              'package.json',
            ),
            {
              with: { type: 'json' },
            }
          );
          value[pkgName] = `^${pkgJson.version}`;
        }
      }
    }
  }
}

async function writePkgJson() {
  const files = await glob(`${pkgSrcDir}/**/package.json`.replace(/\\/g, '/'), {
    ignore: '**/node_modules/**',
  });

  for (const file of files) {
    const { default: pkgJson } = await import(file, {
      with: { type: 'json' },
    });

    await updateWorkspaceVersion(pkgJson);
    pkgJson.main = 'index.js';
    pkgJson.module = 'index.js';

    await fse.outputFile(
      file.replace(pkgSrcDir, pkgDistDir),
      JSON.stringify(pkgJson, null, 2) + '\n',
    );
  }
}

async function copyReadme() {
  await copy(path.resolve(process.cwd(), 'README.md'), path.resolve(pkgDistDir, 'README.md'));
}

async function build() {
  pkgName = await selectPackage();
  pkgDistDir = path.resolve(distDir, pkgName);
  pkgSrcDir = path.resolve(packagesDir, pkgName);

  void checkType;

  const steps: Steps = [
    // [checkType, `类型检查`, true],
    [deleteDistDir, `清空 ${pkgDistDir} 目录`],
    [generateType, `生成类型文件`, true],
    [compile, `编译`, true],
    [writePkgJson, `写入 package.json 文件`],
  ];

  if (pkgName === 'cosey') {
    steps.push([copyReadme, '复制 README.md']);
  }

  await flow(steps);
}

build();
