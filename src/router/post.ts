import { Application } from "express-serve-static-core";
import { join } from "path";
import { initParameter } from "../common/parameter";
import {
  HTTP_KEY,
  IControllerMetadata,
  IMethodMetadata,
} from "../decorator/http.decorator";
import { initMethod } from "./init";

export function initPOST(
  prototype: string[],
  element: string,
  controllerMetadata: IControllerMetadata,
  app: Application
): void {
  const methodPOSTData: IMethodMetadata = Reflect.getMetadata(
    HTTP_KEY.Post,
    prototype[element]
  );

  if (!methodPOSTData) return;

  const { info, fn } = methodPOSTData;

  // url路径拼接
  const urlPath = join("/" + controllerMetadata.path, info).replace(/\\/g, "/");

  console.log("监测到路由" + urlPath + "已装载");

  // 解析类函数内方法的参数
  const metadata = initParameter(controllerMetadata);
  // 装载POST方法
  initMethod("post", urlPath, app, metadata, controllerMetadata, element);
}
