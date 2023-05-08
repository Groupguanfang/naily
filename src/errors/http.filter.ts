import { Logger } from "../main";

export class ICoreError extends Error {
  constructor(message: string) {
    super(message);
    new Logger().error(message, undefined);
  }
}

export function HttpException<T extends any>(message?: T): void {
  this.message = (() => {
    if (!message) {
      return {
        statusCode: 500,
        message: "Internal Server Error",
        error: "HttpException",
        timestamp: new Date(),
      };
    } else return message;
  })();
  this.name = "HttpException";
  Error.captureStackTrace(this, HttpException);
}
HttpException.prototype = new Error();
HttpException.prototype.constructor = HttpException;
