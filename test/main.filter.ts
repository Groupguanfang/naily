import { Request, Response } from "express-serve-static-core";
import {
  Catch,
  ExceptionFilter,
  HttpException,
  UnknownErrorFilter,
} from "../src/main";

@Catch(HttpException)
export class CustomFilter implements ExceptionFilter {
  catch(exception: typeof HttpException, req: Request, res: Response): void {
    res.json({
      code: 500,
      message: "这是一个错误过滤器抛出的信息～",
    });
  }
}

@Catch()
export class AnyFilter implements UnknownErrorFilter {
  catch(exception: unknown, req: Request, res: Response): void {
    res.json({
      code: 500,
      message: "遇到毁灭性错误！！",
    });
  }
}
