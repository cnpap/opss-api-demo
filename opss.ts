import { resolve } from 'node:path';
import * as process from 'node:process';
import glob from 'tiny-glob';
import type { SafeRpcConfiguration } from './opss-type';

const dirname = process.cwd();

// noinspection JSUnusedGlobalSymbols
export async function config(): Promise<SafeRpcConfiguration> {
  const controllers = await glob('src/**/*controller.ts', {
    absolute: true,
  });
  return {
    openapiPath: resolve(dirname, 'openapi'),
    serviceGroups: [
      {
        serviceName: 'opss-api',
        entryFiles: controllers,
        framework: 'nest',
      },
    ],
  };
}
