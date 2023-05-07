import { Request } from "express-serve-static-core";
import {
  HTTP_KEY,
  IControllerMetadata,
  IParameterMetadata,
} from "../decorator/http.decorator";

export interface IinitParameter {
  queryMetadata: IParameterMetadata;
  paramMetadata: IParameterMetadata;
  bodyMetadata: IParameterMetadata;
}
/**
 * 获取类中所有的`ParameterDecorator`所设置的的metadata
 *
 * @param controllerMetadata 控制器的metadata
 */
export function initParameter(
  controllerMetadata: IControllerMetadata
): IinitParameter {
  // 获取所有query和params
  const queryMetadata: IParameterMetadata = Reflect.getMetadata(
    HTTP_KEY.Query,
    controllerMetadata.clazz
  );
  const paramMetadata: IParameterMetadata = Reflect.getMetadata(
    HTTP_KEY.Param,
    controllerMetadata.clazz
  );
  const bodyMetadata: IParameterMetadata = Reflect.getMetadata(
    HTTP_KEY.Body,
    controllerMetadata.clazz
  );
  return {
    queryMetadata,
    paramMetadata,
    bodyMetadata,
  };
}

/**
 * 解析出类中函数的参数是什么
 *
 * @param metadata 这个对象包含所有筛选出来的metadata，就是上面那个函数返回的内容
 * @param fn 类中的函数
 * @param req express的request对象
 * @returns {any} 返回一个数组，这个数组会展开到调用函数里面。至于数组里面是什么内容我们不用管，此时是准备调用类中的函数的时候，参数也是随机的我们不知道用户传入了什么鬼东西反正
 */
export function analysisParameter(
  metadata: IinitParameter,
  fn: Function,
  req: Request
): any[] {
  // 即将调用的所有args
  const args = [];
  // 如果存在
  if (metadata.queryMetadata && metadata.queryMetadata.name === fn.name) {
    args[metadata.queryMetadata.index] = req.query;
  }
  if (metadata.paramMetadata && metadata.paramMetadata.name === fn.name) {
    args[metadata.paramMetadata.index] = req.params;
  }
  if (metadata.bodyMetadata && metadata.bodyMetadata.name === fn.name) {
    args[metadata.bodyMetadata.index] = req.body;
  }
  return args;
}
