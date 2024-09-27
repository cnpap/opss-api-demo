import { Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  handleRequest(err: string, user: any, info: any, context: any) {
    this.logger.debug(
      `Auth result: ${!!user}, Error: ${err}, Info: ${JSON.stringify(info)}}`,
    );
    return super.handleRequest(err, user, info, context);
  }
}
