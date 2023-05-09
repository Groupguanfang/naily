import { Request, Response } from "express-serve-static-core";
import { Logger } from "../main";
import { HttpStatus, HttpStatusText } from "./http-status";

export class ICoreError extends Error {
  constructor(message: string) {
    super(message);
    new Logger().error(message, undefined);
  }
}

export function HttpException<T extends any>(
  code: HttpStatus,
  message?: T
): void {
  this.message = (() => {
    if (!message) {
      return {
        statusCode: code,
        data: {
          statusCode: code,
          message: HttpStatusText[code],
          error: "HttpException",
          timestamp: new Date(),
        },
      };
    } else return message;
  })();
  this.name = "HttpException";
  Error.captureStackTrace(this, HttpException);
}
HttpException.prototype = new Error();
HttpException.prototype.constructor = HttpException;

export interface ExceptionFilter {
  catch(exception: typeof HttpException, req: Request, res: Response): void;
}

export class ExceptionFilterClass implements ExceptionFilter {
  catch(exception: typeof HttpException, req: Request, res: Response): void {}
}

export interface UnknownErrorFilter {
  catch(exception: unknown, req: Request, res: Response): void;
}

export class UnknownErrorFilterClass implements UnknownErrorFilter {
  catch(exception: unknown, req: Request, res: Response): void {}
}
