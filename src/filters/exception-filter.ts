import {
  ArgumentsHost,
  BadRequestException,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { IncomingMessage } from 'http';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

export const getStatusCode = (exception: unknown): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = (exception: unknown): string => {
  if (exception instanceof HttpException) {
    return exception.message;
  } else {
    return String(exception);
  }
};

export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IncomingMessage>();
    const code = getStatusCode(exception);
    const message = getErrorMessage(exception);

    if (exception instanceof ForbiddenException) {
      console.log(message);

      response.status(403).json({
        timestamp: new Date().toISOString(),
        path: request.url,
        code: 403,
        message: 'Forbidden: Request is not authorized',
      });
      return;
    } else if (exception instanceof BadRequestException) {
      let messageFormatted = JSON.stringify(
        (exception.getResponse() as any)?.message,
      );
      //regex to remove newline characters from error message
      messageFormatted = messageFormatted.replace(/,/g, '; ');
      //regex to remove escape characters from error message
      messageFormatted = messageFormatted.replace(/"/g, '');
      messageFormatted = messageFormatted.replace(/ +/g, ' ');
      messageFormatted = messageFormatted.replace(/\n/g, '');
      messageFormatted = messageFormatted.replace(/([\[\]])+/g, '');

      response.status(code).json({
        timestamp: new Date().toISOString(),
        path: request.url,
        code: code,
        message: messageFormatted,
      });
      return;
    } else if (
      exception instanceof EntityNotFoundError ||
      exception instanceof QueryFailedError
    ) {
      let messageFormatted = exception.message.replace(/\n/g, '');
      //regex to remove escape characters from error message
      messageFormatted = messageFormatted.replace(/"/g, "'");
      messageFormatted = messageFormatted.replace(/ +/g, ' ');

      const status = exception instanceof EntityNotFoundError ? 404 : 400;
      console.log(messageFormatted);

      response.status(status).json({
        timestamp: new Date().toISOString(),
        path: request.url,
        code: status,
        message:
          exception instanceof EntityNotFoundError
            ? 'Entity Not Found'
            : 'Bad Request',
      });
      return;
    } else if (message.includes('AxiosError')) {
      const formattedResponse = {
        timestamp: new Date().toISOString(),
        type: 'AXIOS_ERROR',
        devDescription: 'Failed to communicate successfully through axios',
        status: exception.response?.status,
        statusText: exception.response?.statusText,
        responseData: exception.response?.data,
      };

      const formattedDevLog = {
        timestamp: new Date().toISOString(),
        request:
          exception.response?.config?.method.toUpperCase() +
          ' ' +
          exception.response?.config?.baseURL +
          '/' +
          exception.response?.config?.url,
        data: exception.response?.config?.data,
        ...formattedResponse,
      };

      console.error(formattedDevLog);

      const statusForResponse = exception.response?.data?.status || code;

      response.status(statusForResponse).json({
        timestamp: new Date().toISOString(),
        code: statusForResponse,
        message: 'Error in internal API call',
      });
      return;
    } else {
      console.error(exception.stack);
      response.status(code).json({
        timestamp: new Date().toISOString(),
        path: request.url,
        code,
        message,
      });
    }
  }
}
