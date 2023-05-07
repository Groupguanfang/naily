import "reflect-metadata";

// 容器装载所有的类
export const componentContiner = [];

export enum HTTP_KEY {
  Controller = "controller",
  Get = "get",
}

export const Controller = function (path: string = "/"): ClassDecorator {
  return (target: any) => {
    // 为了不再index页面手动new 对象，采用类似spring容器的方式管理
    componentContiner.push(target);

    // 反射会用到一些信息
    Reflect.defineMetadata(
      HTTP_KEY.Controller,
      { path, clazz: new target() },
      target
    );
  };
};

export const Get = (info: string = "/"): MethodDecorator => {
  return (target: any, methodName: string, desc: any) => {
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
