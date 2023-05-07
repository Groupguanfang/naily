import "reflect-metadata";

// 容器装载所有的类
export const componentContiner = [];

export enum HTTP_KEY {
  Controller = "controller",
  Get = "get",
  Post = "post",
  Query = "query",
  Param = "param",
  Body = "body",
}

export interface IControllerMetadata {
  path: string;
  clazz: any;
}
export const NestController = function (path: string = "/"): ClassDecorator {
  return (target: any) => {
    // 为了不再index页面手动new 对象，采用类似spring容器的方式管理
    componentContiner.push(target);

    // 反射会用到一些信息
    Reflect.defineMetadata(
      HTTP_KEY.Controller,
      {
        path,
        clazz: new target(),
      },
      target
    );
  };
};

export interface IMethodMetadata {
  info: string;
  fn: Function;
}
export const GetMapping = (info: string = "/"): MethodDecorator => {
  // desc就是那个函数对象
  return (target, methodName, desc) => {
    // 会用到原始函数
    Reflect.defineMetadata(
      HTTP_KEY.Get,
      {
        info,
        fn: desc.value,
      },
      desc.value
    );
  };
};

export const PostMapping = (info: string = "/"): MethodDecorator => {
  // desc就是那个函数对象
  return (target, methodName, desc) => {
    // 会用到原始函数
    Reflect.defineMetadata(
      HTTP_KEY.Post,
      {
        info,
        fn: desc.value,
      },
      desc.value
    );
  };
};

export interface IParameterMetadata {
  name: string;
  index: number;
}
export const Query: ParameterDecorator = (target, name, index) => {
  Reflect.defineMetadata(
    HTTP_KEY.Query,
    {
      name: name,
      index: index,
    },
    target
  );
};

export const Param: ParameterDecorator = (target, name, index) => {
  Reflect.defineMetadata(
    HTTP_KEY.Param,
    {
      name: name,
      index: index,
    },
    target
  );
};

export const Body: ParameterDecorator = (target, name, index) => {
  Reflect.defineMetadata(
    HTTP_KEY.Body,
    {
      name: name,
      index: index,
    },
    target
  );
};
