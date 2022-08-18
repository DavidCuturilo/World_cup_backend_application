import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('RoutesLogger');

  use(req: Request, res: Response, next: NextFunction) {
    const timestampStart = Date.now();
    const baseUrl = req.baseUrl;

    this.logger.log(`${req.method} ${req.baseUrl}`);

    // if request is POST, log body
    if (req.method === 'POST' && req.body) {
      this.logger.verbose(JSON.stringify(req.body));
    }

    // else if request is GET, log query
    else if (
      req.method === 'GET' &&
      req.query &&
      Object.keys(req.query).length > 0
    ) {
      //log params from route
      this.logger.verbose(req.query);
    }

    //log after request is finished
    res.on('finish', () => {
      const timestampEnd = Date.now();
      // get request url from res

      this.logger.verbose(
        `${res.req.method} ${baseUrl} finished in ${
          timestampEnd - timestampStart
        }ms`,
      );
    });

    next();
  }
}
