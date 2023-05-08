import { Application, RequestHandler } from "express-serve-static-core";
import { IinitParameter, analysisParameter } from "../common/parameter";
import { IControllerMetadata } from "../decorator/http.decorator";
import { Logger } from "../main";
import { types } from "util";

export function initMethod(
  method: "get" | "post" | "put" | "patch" | "options" | "delete" | "all",
  urlPath: string,
  app: Application,
  metadata: IinitParameter,
  controllerMetadata: IControllerMetadata,
  element: string
) {
  new Logger().log(`映射到路由：【 ${urlPath} 】已装载`);
  // 调用了express的app.get/app.post/app.put/....的方法
  const handler: RequestHandler = (req, res) => {
    // 解析出类中函数的参数
    const args = analysisParameter(
      metadata,
      controllerMetadata.clazz[element],
      req
    );
    // 将参数赋予给类中函数 然后执行
    const ret = controllerMetadata.clazz[element](...args);
    // 发送类中函数返回的内容
    if (types.isPromise(ret)) {
      (async () => res.send(await ret))();
    } else {
      res.send(ret);
    }
  };
  app[method](urlPath, handler);
}
