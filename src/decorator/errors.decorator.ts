import "reflect-metadata";
import { HttpException } from "../main";
import { HTTP_KEY } from "./http.decorator";

const enum ERROR_KEY {
  Catch = "catch_filter",
}

export const Catch = (exception?: Function): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(ERROR_KEY.Catch, exception, target);
  };
};

export const UseFilter = (filter: Function): MethodDecorator => {
  return (target, methodName, desc) => {
    const data = Reflect.getMetadata(ERROR_KEY.Catch, filter);
    if (!data) {
      Reflect.defineMetadata(
        HTTP_KEY.UnknownErrorFilter,
        {
          // @ts-ignore
          filter: new filter(),
          fn: desc.value,
          parameter: data,
        },
        desc.value
      );
    } else if (data instanceof HttpException) {
      Reflect.defineMetadata(
        HTTP_KEY.ExceptionFilter,
        {
          // @ts-ignore
          filter: new filter(),
          fn: desc.value,
          parameter: data,
        },
        desc.value
      );
    }
  };
};
