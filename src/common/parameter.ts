import {
  HTTP_KEY,
  IControllerMetadata,
  IParameterMetadata,
} from "src/decorator/http.decorator";

export interface IinitParameter {
  queryMetadata: IParameterMetadata;
  paramMetadata: IParameterMetadata;
  bodyMetadata: IParameterMetadata;
}

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
