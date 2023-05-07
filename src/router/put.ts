import { Application } from "express-serve-static-core";
import {
  HTTP_KEY,
  IControllerMetadata,
  IMethodMetadata,
} from "../decorator/http.decorator";
import { join } from "path";
import {
  IinitParameter,
  analysisParameter,
  initParameter,
} from "../common/parameter";

export function initPUT(
  prototype: string[],
  element: string,
  controllerMetadata: IControllerMetadata,
  app: Application
): void {
  const methodGETData: IMethodMetadata = Reflect.getMetadata(
    HTTP_KEY.Put,
    prototype[element]
  );

  if (!methodGETData) return;

  const { info, fn } = methodGETData;
  // url路径拼接
  const urlPath = join("/" + controllerMetadata.path, info).replace(/\\/g, "/");

  // 解析类函数内方法的参数
  const metadata = initParameter(controllerMetadata);

  // 装载PUT方法
  PutMethod(fn, urlPath, app, metadata);
}

function PutMethod(
  fn: Function,
  urlPath: string,
  app: Application,
  metadata: IinitParameter
) {
  app.put(urlPath, (req, res) => {
    // 解析出类中函数的参数
    const args = analysisParameter(metadata, fn, req);
    // 将参数赋予给类中函数 然后执行
    const ret = fn(...args);
    // 发送类中函数返回的内容
    res.send(ret);
  });
}
