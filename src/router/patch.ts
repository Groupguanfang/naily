import { Application } from "express-serve-static-core";
import {
  HTTP_KEY,
  IControllerMetadata,
  IMethodMetadata,
} from "../decorator/http.decorator";
import { join } from "path";
import { initParameter } from "../common/parameter";
import { initMethod } from "./init";

export function initPatch(
  prototype: string[],
  element: string,
  controllerMetadata: IControllerMetadata,
  app: Application
): void {
  const methodGETData: IMethodMetadata = Reflect.getMetadata(
    HTTP_KEY.Patch,
    prototype[element]
  );

  if (!methodGETData) return;

  const { info, fn } = methodGETData;
  // url路径拼接
  const urlPath = join("/" + controllerMetadata.path, info).replace(/\\/g, "/");

  console.log("监测到路由" + urlPath + "已装载");

  // 解析类函数内方法的参数
  const metadata = initParameter(controllerMetadata);

  // 装载PATCH方法
  initMethod("patch", urlPath, app, metadata, controllerMetadata, element);
}
