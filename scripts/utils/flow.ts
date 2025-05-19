import consola from 'consola';
import ora from 'ora';
import { repositories } from './const';

export type Steps = [(...args: any[]) => any, string, boolean?][];

export async function flow(steps: Steps) {
  const spinner = ora();
  try {
    for (const [index, [step, msg, wait]] of steps.entries()) {
      const text = `[${index + 1}/${steps.length}] ${msg}`;
      if (wait) {
        spinner.start(text);
      }
      await step?.();
      spinner.stop();
      consola.success(text);
    }

    consola.success('已完成所有构建流程');
  } catch (err) {
    spinner.stop();
    consola.error(err);
  }
}

export async function selectPackage() {
  const pkgName = await consola.prompt('请选择包', {
    type: 'select',
    options: repositories,
  });
  return pkgName;
}
