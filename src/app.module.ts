import { Module } from '@nestjs/common';
import { registerImport } from './register';
import { DogModule } from './rest-friend/dog/dog.module';
import { CatModule } from './rest-friend/cat/cat.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [...registerImport(), CatModule, DogModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
