import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port', 3000);
  const host = configService.get<string>('app.host', 'localhost');
  const schema = configService.get<string>('app.schema', 'http');
  const mode = configService.get<string>('app.mode', 'p');
  await app.listen(3000, () => {
    const logger = new Logger('      😄       ');
    logger.log(`Server is running on ${schema}://${host}:${port}`);
    if (mode === 'd') {
      logger.debug(`JWT secret: ${configService.get<string>('jwt.secret')}`);
    }
  });
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
