import path from 'node:path';
import { rimraf } from 'rimraf';
import { compileAllScript } from './utils/transform';

async function compileDocsComponents() {
  const srcDir = path.resolve(process.cwd(), 'docs/components');
  const distDir = path.resolve(process.cwd(), 'docs/temp-components');

  await rimraf(distDir);

  await compileAllScript({
    srcDir: srcDir,
    distDir: distDir,
    externals: [],
  });
}

async function buildDocsComp() {
  await compileDocsComponents();
}

buildDocsComp();
