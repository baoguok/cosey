import * as ghpages from 'gh-pages';
import consola from 'consola';
import path from 'node:path';

interface SiteConfig {
  key: string;
  name: string;
  outDir: string;
  branch: string;
  repo: string;
}

const sites: SiteConfig[] = [
  {
    key: 'cosey-demo',
    name: 'cosey 演示',
    outDir: path.resolve(process.cwd(), 'dist'),
    branch: 'gh-pages',
    repo: 'git@wzt.zone:/home/git/cosey-demo.git',
  },
  {
    key: 'cosey-docs',
    name: 'cosey 文档',
    outDir: path.resolve(process.cwd(), 'docs/.vitepress/dist'),
    branch: 'gh-pages',
    repo: 'git@wzt.zone:/home/git/cosey-docs.git',
  },
];

async function selectSiteConfigs() {
  const key = await consola.prompt('请选择要部署的站点', {
    type: 'select',
    options: [
      {
        value: 'all',
        label: '所有',
      },
      ...sites.map((item) => {
        return {
          value: item.key,
          label: item.name,
        };
      }),
    ],
  });

  if (key === 'all') {
    return sites;
  }
  return sites.filter((item) => item.key === key);
}

async function doDeploy(config: SiteConfig) {
  return new Promise<void>((resolve, reject) => {
    consola.start(`[${config.name}] (${config.repo}) 开始部署...`);
    ghpages.publish(
      config.outDir,
      {
        branch: config.branch,
        repo: config.repo,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          consola.success(`[${config.name}] (${config.repo}) 部署成功`);
          resolve();
        }
      },
    );
  });
}

async function deploy() {
  const configs = await selectSiteConfigs();

  for (const config of configs) {
    await doDeploy(config);
  }
}

deploy();
