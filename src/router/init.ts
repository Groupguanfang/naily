import { Application } from "express-serve-static-core";
import { IinitParameter, analysisParameter } from "../common/parameter";
import { IControllerMetadata } from "../decorator/http.decorator";

export function initMethod(
  method: "get" | "post" | "put" | "patch" | "options" | "delete" | "all",
  urlPath: string,
  app: Application,
  metadata: IinitParameter,
  controllerMetadata: IControllerMetadata,
  element: string
) {
  // 调用了express的app.get/app.post/app.put/....的方法
  app[method](urlPath, (req, res) => {
    // 解析出类中函数的参数
    const args = analysisParameter(
      metadata,
      controllerMetadata.clazz[element],
      req
    );
    // 将参数赋予给类中函数 然后执行
    const ret = controllerMetadata.clazz[element](...args);
    // 发送类中函数返回的内容
    res.send(ret);
  });
}
