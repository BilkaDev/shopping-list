import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    console.error(exception?.message);
    console.error(exception);
    if (status === 500) {
      return response.status(500).json({
        status,
        message: exception?.message ?? "Please try again in a few minutes.",
      });
    } else {
      return response.status(status).json({
        status,
        message: exception.response.message instanceof Array ? exception.response.message[0] : exception.message,
      });
    }
  }
}
