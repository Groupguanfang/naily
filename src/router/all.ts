import { Application } from "express-serve-static-core";
import {
  HTTP_KEY,
  IControllerMetadata,
  IMethodMetadata,
} from "../decorator/http.decorator";
import { join } from "path";
import { initParameter } from "../common/parameter";
import { initMethod } from "./init";
import { Logger } from "../main";

export function initAll(
  prototype: string[],
  element: string,
  controllerMetadata: IControllerMetadata,
  app: Application
): void {
  const methodGETData: IMethodMetadata = Reflect.getMetadata(
    HTTP_KEY.All,
    prototype[element]
  );

  if (!methodGETData) return;

  const { info } = methodGETData;
  // url路径拼接
  const urlPath = join("/" + controllerMetadata.path, info).replace(/\\/g, "/");

  // 解析类函数内方法的参数
  const metadata = initParameter(controllerMetadata);

  // 装载ALL方法
  initMethod("all", urlPath, app, metadata, controllerMetadata, element);
}
