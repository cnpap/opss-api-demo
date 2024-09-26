import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { Logger } from '@nestjs/common';

const schema = process.env.SCHEMA || 'http';
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(port);
}

bootstrap().then(() => {
  const logger = new Logger('      😄       ');
  logger.log(`Server is running on ${schema}://${host}:${port}`);
});
