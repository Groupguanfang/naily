import * as express from "express";
import "reflect-metadata";
import {
  componentContiner,
  HTTP_KEY,
  IControllerMetadata,
  IMethodMetadata,
} from "./decorator/http.decorator";
import { initGET } from "./router/get";
import { initPOST } from "./router/post";

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
    initGET(prototype, element, controllerMetadata, app);
    initPOST(prototype, element, controllerMetadata, app);
  });
});

app.listen(8000, () => console.log("已启动"));
