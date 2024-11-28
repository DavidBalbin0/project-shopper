import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      error_code: exception.response?.error_code || 'INTERNAL_SERVER_ERROR',
      error_description:
        exception.response?.error_description || `An unexpected error occurred: ${exception.message}`,
      // message: exception.message,
      // stack: exception.stack,
    };

    response.status(status).json(errorResponse);
  }
}
