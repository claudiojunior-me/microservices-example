import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode, req } = response;
      const { params } = req;
      const contentLength = response.get('content-length');

      this.logger.log(
        `[${method}] ${originalUrl} :: ${statusCode} : ${contentLength} - params: ${params} ::: ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
