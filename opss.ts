import { resolve } from 'node:path';
import * as process from 'node:process';
import glob from 'tiny-glob';
import type { SafeRpcConfiguration } from './opss-type';
import dotenv from 'dotenv';
import { OperationObject } from './opss-schema';

dotenv.config();

const dirname = process.cwd();

// noinspection JSUnusedGlobalSymbols
export async function config(): Promise<SafeRpcConfiguration> {
  const controllers = await glob('src/**/*controller.ts', {
    absolute: true,
  });
  return {
    onParseComplete: (openAPI) => {
      for (const path in openAPI.paths) {
        const pathItem = openAPI.paths[path];
        for (const method in pathItem) {
          const operation = pathItem[method] as OperationObject;
          const annotations = operation['x-controller-annotations'];
          for (const annotation of annotations) {
            if (annotation.startsWith('UseGuards')) {
              // 设置该接口携带 Authorization 头
              operation.security = operation.security || [];
              operation.security.push({ BearerAuth: [] });
              operation.parameters = operation.parameters || [];
              operation.parameters.push({
                name: 'Authorization',
                in: 'header',
                schema: {
                  type: 'string',
                },
                example: 'Bearer {{token}}',
              });
            }
          }
        }
      }
    },
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
