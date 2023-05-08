import { Request, Response } from "express-serve-static-core";
import { ExceptionFilter, HttpException } from "../src/main";

export class CustomFilter implements ExceptionFilter {
  catch(exception: typeof HttpException, req: Request, res: Response): void {
    res.json({
      code: 500,
      message: "这是一个错误过滤器抛出的信息～",
    });
  }
}
