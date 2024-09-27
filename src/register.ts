import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { CatsModule } from './cats/cats.module';

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
    CatsModule,
  ];
}
