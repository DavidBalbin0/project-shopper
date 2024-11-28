import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor(
    error_code: string,
    error_description: string[],
    status: HttpStatus,
  ) {
    super({ error_code, error_description }, status);
  }
}
