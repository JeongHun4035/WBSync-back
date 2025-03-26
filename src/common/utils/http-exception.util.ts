import { HttpException, HttpStatus } from '@nestjs/common';

export function throwBadRequest(message: string, errorCode: string): never {
  throw new HttpException(
    {
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      errorCode,
    },
    HttpStatus.BAD_REQUEST,
  );
}
