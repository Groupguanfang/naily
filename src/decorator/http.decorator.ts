import "reflect-metadata";
import { DI_KEY } from "./di.decorator";

// 容器装载所有的类
type Constructor<T = any> = new (...args: any[]) => T;
export const componentContiner: Constructor[] = [];

export enum HTTP_KEY {
  Controller = "controller",
  Get = "get",
  Post = "post",
  Put = "put",
  Patch = "patch",
  Delete = "delete",
  Options = "options",
  All = "all",
  Query = "query",
  Param = "param",
  Body = "body",
  Ip = "ip",
}

export interface IControllerMetadata {
  path: string;
  clazz: any;
}

export const RestController = function (path: string = "/"): ClassDecorator {
  return (target: any) => {
    // 为了不再index页面手动new 对象，采用类似spring容器的方式管理
    componentContiner.push(target);

    // 获取TypeScript自动加入进去的design:paramtypes
    const classParams: any[] = Reflect.getMetadata("design:paramtypes", target);

    // 筛出子参数内的子类
    function parseParam(param: any[], parent: any) {
      return param.map((item, index) => {
        if (typeof item === "function") {
          const isInjectable2 = Reflect.getMetadata(DI_KEY.Injectable, parent);
          if (isInjectable2) {
            const childFunctionParam: any[] = Reflect.getMetadata(
              "design:paramtypes",
              item
            );
            if (childFunctionParam) {
              const value = parseParam(childFunctionParam, item)[index];
              return value;
            } else {
              return new item();
            }
          } else {
            return item;
          }
        }
      });
    }
    // 遍历参数看看是否是DI类
    function childCall(params?: any[], args = [], deep = 0) {
      let whatCircle: any[] = [];
      if (params) {
        whatCircle = params;
        deep++;
      } else {
        whatCircle = classParams;
      }
      // 如果没有任何注入的情况下
      // if (!whatCircle) return [];
      whatCircle.forEach((jtem, index) => {
        if (typeof jtem === "function") {
          // 如果是Injectable
          const isInjectable = Reflect.getMetadata(DI_KEY.Injectable, jtem);
          if (isInjectable) {
            // 那么就获取该Injectable的Parameter
            const param: any[] = Reflect.getMetadata("design:paramtypes", jtem);
            // 如果有Parameter
            if (param) {
              // 如果没有传入params参数说明是根类
              if (!params) {
                args.push(new jtem(...args));
              } else {
                args[Object.keys(args)[index]] = new jtem(
                  ...parseParam(param, jtem)
                );
              }
              childCall(param, args[index], deep);
            } else {
              args.push(new jtem());
            }
          } else {
            throw new Error("发现有一个类没有标注@Injectable");
          }
        }
      });
      return args;
    }
    const arg = childCall();
    // 反射出类会用到一些信息
    Reflect.defineMetadata(
      HTTP_KEY.Controller,
      {
        path,
        clazz: new target(...arg),
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

export const PutMapping = (info: string = "/"): MethodDecorator => {
  // desc就是那个函数对象
  return (target, methodName, desc) => {
    // 会用到原始函数
    Reflect.defineMetadata(
      HTTP_KEY.Put,
      {
        info,
        fn: desc.value,
      },
      desc.value
    );
  };
};

export const PatchMapping = (info: string = "/"): MethodDecorator => {
  // desc就是那个函数对象
  return (target, methodName, desc) => {
    // 会用到原始函数
    Reflect.defineMetadata(
      HTTP_KEY.Patch,
      {
        info,
        fn: desc.value,
      },
      desc.value
    );
  };
};

export const DeleteMapping = (info: string = "/"): MethodDecorator => {
  // desc就是那个函数对象
  return (target, methodName, desc) => {
    // 会用到原始函数
    Reflect.defineMetadata(
      HTTP_KEY.Delete,
      {
        info,
        fn: desc.value,
      },
      desc.value
    );
  };
};

export const OptionsMapping = (info: string = "/"): MethodDecorator => {
  // desc就是那个函数对象
  return (target, methodName, desc) => {
    // 会用到原始函数
    Reflect.defineMetadata(
      HTTP_KEY.Options,
      {
        info,
        fn: desc.value,
      },
      desc.value
    );
  };
};

export const RequestMapping = (info: string = "/"): MethodDecorator => {
  // desc就是那个函数对象
  return (target, methodName, desc) => {
    // 会用到原始函数
    Reflect.defineMetadata(
      HTTP_KEY.All,
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

export const Ip: ParameterDecorator = (target, name, index) => {
  Reflect.defineMetadata(
    HTTP_KEY.Ip,
    {
      name: name,
      index: index,
    },
    target
  );
};
