import * as express from "express";
import "reflect-metadata";
import {
  componentContiner,
  HTTP_KEY,
  IControllerMetadata,
} from "./decorator/http.decorator";
import { initGET } from "./router/get";
import { initPOST } from "./router/post";
import { initPUT } from "./router/put";
import { initPatch } from "./router/patch";
import { initDelete } from "./router/delete";
import { initOptions } from "./router/options";
import { initAll } from "./router/all";
import { ExceptionFilter, HttpException, Logger } from "./main";
import { NextFunction, Request, Response } from "express-serve-static-core";

const app = express();

// 路由分配
// 遍历出来的item就是单个控制器类
componentContiner.forEach((item) => {
  // 获取Controller反射
  const controllerMetadata: IControllerMetadata = Reflect.getMetadata(
    HTTP_KEY.Controller,
    item
  );

  // 获取Controller类的原型
  const prototype = Object.getPrototypeOf(controllerMetadata.clazz);

  // 原型上的方法并过滤构造函数
  const methodNames = Object.getOwnPropertyNames(prototype).filter(
    (item) => item !== "constructor"
  );

  // 反射获取方法，并进行方法增强
  methodNames.forEach((element) => {
    // 装载get方法～
    initGET(prototype, element, controllerMetadata, app);
    // 装载post方法～
    initPOST(prototype, element, controllerMetadata, app);
    // 装载put方法～
    initPUT(prototype, element, controllerMetadata, app);
    // 装载patch方法～
    initPatch(prototype, element, controllerMetadata, app);
    // 装载delete方法～
    initDelete(prototype, element, controllerMetadata, app);
    // 装载options方法～
    initOptions(prototype, element, controllerMetadata, app);
    // 装载all方法～
    initAll(prototype, element, controllerMetadata, app);

    // 装载错误过滤器
    app.use(
      (error: unknown, req: Request, res: Response, next: NextFunction) => {
        const filterReflect: { filter: ExceptionFilter; fn: Function } =
          Reflect.getMetadata(HTTP_KEY.Filter, prototype[element]);
        if (filterReflect) {
          return filterReflect.filter.catch(HttpException, req, res);
        }
        if (error instanceof HttpException) {
          let value = error.message as unknown as {
            statusCode: number;
            data: any;
          };
          res.status(value.statusCode).send(value.data);
        } else if (error instanceof Error) {
          res.json(error.message);
        }
      }
    );
  });
});

export default {
  listen(port: number, callBack?: Function) {
    app.listen(port, () => {
      if (callBack) {
        callBack();
        return;
      } else {
        new Logger().log("Naily APP已经在端口" + port + "启动");
      }
    });
  },
  use: app.use,
};
