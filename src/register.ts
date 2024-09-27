import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import * as schema from './entity/drizzle';

export function registerImport() {
  return [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          config: {
            host: configService.get<string>('redis.host', 'localhost'),
            port: configService.get<number>('redis.port', 6379),
            password: configService.get<string>('redis.password'),
          },
        };
      },
    }),
    DrizzlePGModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      tag: 'db',
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('database.host', 'localhost');
        const port = configService.get<number>('database.port', 5432);
        const user = configService.get<string>('database.user', 'postgres');
        const password = configService.get<string>(
          'database.password',
          '123456',
        );
        const database = configService.get<string>(
          'database.database',
          'drizzleDB',
        );
        return {
          pg: {
            connection: 'client',
            config: {
              connectionString: `postgres://${user}:${password}@${host}:${port}/${database}`,
            },
          },
          config: { schema: { ...schema } },
        };
      },
    }),
  ];
}
