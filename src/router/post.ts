import { Application } from "express-serve-static-core";
import { join } from "path";
import {
  IinitParameter,
  analysisParameter,
  initParameter,
} from "../common/parameter";
import {
  HTTP_KEY,
  IControllerMetadata,
  IMethodMetadata,
} from "../decorator/http.decorator";

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
  PostMethod(fn, urlPath, app, metadata);
}

function PostMethod(
  fn: Function,
  urlPath: string,
  app: Application,
  parameters: IinitParameter
) {
  app.post(urlPath, (req, res) => {
    // 解析出类中函数的参数
    const getArgs = analysisParameter(parameters, fn, req);
    // 将参数赋予给类中函数 然后执行
    const ret = fn(...getArgs);
    // 发送类中函数返回的内容
    res.send(ret);
  });
}
