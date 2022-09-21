import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { configService } from 'src/config/config.service';

@Injectable()
export class WorldCupAuthGuard implements CanActivate {
  logger = new Logger('WorldCupAuthGuard');
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['world_cup_api_key'];
    return token === configService.getValue('WORLD_CUP_API_KEY');
  }
}
