import { Module } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { registerImport } from './register';
import { DogModule } from './rest-friend/dog/dog.module';
import { CatModule } from './rest-friend/cat/cat.module';

@Module({
  imports: [...registerImport(), CatModule, DogModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
