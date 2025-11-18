import { transformSync } from '@babel/core';
import esbuild, { type Loader } from 'esbuild';
import * as compiler from 'vue/compiler-sfc';
import { glob } from 'glob';
import { rollup } from 'rollup';
import { type PluginOption } from 'vite';
import path from 'node:path';
import fs from 'node:fs';
import json from '@rollup/plugin-json';

export function transformTs(code: string, loader: Loader = 'ts') {
  return esbuild.transformSync(code, {
    jsx: 'preserve',
    loader,
    format: 'esm',
    target: 'esnext',
  }).code;
}

export function transformJSX(code: string) {
  return (
    transformSync(code, {
      plugins: [['@vue/babel-plugin-jsx']],
    })?.code || ''
  );
}

export function transformVue(code: string, file: string) {
  const { descriptor } = compiler.parse(code, {
    filename: file,
  });

  const scriptBlock = compiler.compileScript(descriptor, {
    id: file,
    inlineTemplate: true,
  });

  const content = transformTs(scriptBlock.content, scriptBlock.lang as Loader);

  return transformJSX(content);
}

function transformPlugin(): PluginOption {
  return {
    name: 'transform',
    async resolveId(source, importer) {
      if (source.startsWith('.') && importer) {
        const baseDir = path.dirname(importer);
        const resolved = path.resolve(baseDir, source);

        const extensions = ['.ts', '.tsx', '/index.ts', '/index.tsx', '.js'];
        for (const ext of extensions) {
          const fullPath = `${resolved}${ext}`;
          if (fs.existsSync(fullPath)) return fullPath;
        }
      }
    },
    transform(code, id) {
      if (/\.ts$/.test(id)) {
        return transformTs(code);
      }
      if (/\.tsx$/.test(id)) {
        return transformJSX(transformTs(code, 'tsx'));
      }
      if (/\.jsx$/.test(id)) {
        return transformJSX(code);
      }
      if (/\.vue$/.test(id)) {
        return transformVue(code, id);
      }
    },
  };
}

export async function compileAllScript(options: {
  srcDir: string;
  distDir: string;
  externals: string[];
}) {
  const { srcDir, distDir, externals } = options;

  const files = await glob(`${srcDir}/**/*.{vue,js,jsx,ts,tsx}`.replace(/\\/g, '/'), {
    ignore: '**/node_modules/**',
  });

  const sideEffects = ['element-plus/dist/index.css', 'element-plus/theme-chalk/dark/css-vars.css'];

  const bundle = await rollup({
    input: files,
    external: (source) => externals.some((item) => source.startsWith(item)),
    treeshake: {
      moduleSideEffects: (id) => {
        if (sideEffects.includes(id) || id.startsWith('prismjs')) {
          return true;
        } else {
          return false;
        }
      },
    },
    plugins: [transformPlugin(), json()],
    logLevel: 'silent',
  });

  await bundle.write({
    format: 'esm',
    dir: distDir,
    preserveModules: true,
    preserveModulesRoot: srcDir,
    entryFileNames: `[name].js`,
  });
}
