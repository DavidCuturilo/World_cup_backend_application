import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class RapidAuthGuard implements CanActivate {
  logger = new Logger('RapidAuthGuard');
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['rapid-api-key'];
    console.log('Token: ' + token);
    return true;
    //   return token === configService.getValue('RAPID_API_KEY');
  }
}
