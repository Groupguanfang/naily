import "reflect-metadata";
import { DI_KEY } from "./di.decorator";
import { ICoreError } from "../errors/http.filter";

// 容器装载所有的类
type Constructor<T = any> = new (...args: any[]) => T;
export const componentContiner: Constructor[] = [];

// 这是基础的的一些metadata键
export enum HTTP_KEY {
  Controller = "controller",
  Get = "get",
  Post = "post",
  Put = "put",
  Patch = "patch",
  Delete = "delete",
  Options = "options",
  All = "all",
  ExceptionFilter = "exception_filter",
  UnknownErrorFilter = "unknown_filter",
  Query = "query",
  Param = "param",
  Body = "body",
  Ip = "ip",
  Req = "req",
  Res = "res",
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

    /**
     * 筛出子参数内的子类
     *
     * @param param 参数
     * @param parent 父级参数
     * @returns 参数
     */
    function parseParam<T>(param: T[], parent: any): T[] {
      return param.map((item: any, index) => {
        // 如果是函数
        if (typeof item === "function") {
          // 并且该函数是可以被注入的类
          const isInjectable2 = Reflect.getMetadata(DI_KEY.Injectable, parent);
          if (isInjectable2) {
            // 获取到该函数的参数
            const childFunctionParam: any[] = Reflect.getMetadata(
              "design:paramtypes",
              item
            );
            if (childFunctionParam) {
              // 如果有参数 那就调用自身 继续递归嘛
              const value = parseParam(childFunctionParam, item)[index];
              return value;
            } else {
              // 如果没有参数了 那就直接new下
              return new item();
            }
            // 如果不是可以被注入的类那就直接返回出来
          } else {
            return item;
          }
          // 如果不是函数那就直接返回出来
        } else {
          return item;
        }
      });
    }
    /**
     * 遍历参数看看是否是DI类
     *
     * @description 算法应该可以再完善的（但是懒 能跑就行
     * @param params 开始递归的参数
     * @param args 递归完成的的参数
     */
    function childCall<T>(params?: T[], args = []): T[] {
      // 标记现在递归的是哪些参数
      let whatCircle: any[] = [];
      // 如果没有传入params参数 就把classParams传给他
      // 此时whatCircle就是classParams 即第一次递归
      // 如果传入了params参数说明就不是第一次递归了
      // 此时whatCircle就是params
      if (params) {
        whatCircle = params;
      } else {
        whatCircle = classParams;
      }
      // 如果没有任何注入的情况下
      // 就是whatCircle不是一个数组的情况嘛 那就直接返回[]
      if (typeof whatCircle !== "object") {
        return [];
      }
      // whatCircle处理完成 开始遍历whatCircle
      whatCircle.forEach((jtem, index) => {
        // 如果是function
        if (typeof jtem === "function") {
          // 并且是Injectable
          const isInjectable = Reflect.getMetadata(DI_KEY.Injectable, jtem);
          if (isInjectable) {
            // 那么就获取该Injectable的Parameter
            const param: any[] = Reflect.getMetadata("design:paramtypes", jtem);
            // 如果该Injectable有Parameter
            if (param) {
              // 如果没有传入params参数说明是根类
              if (!params) {
                // 是根类 那就把根类注入push上去就行
                args.push(new jtem(...args));
              } else {
                // 不是根类 那就有亿点麻烦了 这个地方卡了我很久
                // 首先获取对象的key 此时这个key对应的value是undefined或者其他什么
                const key = Object.keys(args)[index];
                // 反正不管他是什么 获取到key 直接就把值改为new过的
                // 然后参数交给上面的parseParam函数处理
                args[key] = new jtem(...parseParam(param, jtem));
              }
              // 循环调用 调用到它一滴都不剩
              childCall(param, args[index]);
              // 如果该Injectable没有Parameter
            } else {
              // 如果没有传入params参数说明是根类
              if (!params) {
                // 此时根类没有Parameter
                // 无需分析他的Parameter 没有任何注入的情况 直接push
                args.push(new jtem());
                // 如果传入了params参数说明是子类
                // 必须要做和上面一样的处理
              } else {
                // 和上面一样 获取对象的key
                const key = Object.keys(args)[index];
                // 但是因为这个Injectable没有Parameter了
                // 所以直接new 无需分析传参什么吧啦吧啦的
                args[key] = new jtem();
              }
            }
            // 如果既是函数但又不是Injectable 那就抛出错误
            // 因为没有Injectable是无法处理数据的
          } else {
            const ERR = `有一个被没有被注入的名为${jtem.name}的服务被强制注入到${target.name}控制器里面。请检查错误。`;
            throw new ICoreError(ERR);
          }
        }
      });
      return args;
    }
    // 调用
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
  return (target, methodName, desc: TypedPropertyDescriptor<unknown>) => {
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
export const RequestQuery: ParameterDecorator = (target, name, index) => {
  Reflect.defineMetadata(
    HTTP_KEY.Query,
    {
      name: name,
      index: index,
    },
    target
  );
};

export const RequestParam: ParameterDecorator = (target, name, index) => {
  Reflect.defineMetadata(
    HTTP_KEY.Param,
    {
      name: name,
      index: index,
    },
    target
  );
};

export const RequestBody: ParameterDecorator = (target, name, index) => {
  Reflect.defineMetadata(
    HTTP_KEY.Body,
    {
      name: name,
      index: index,
    },
    target
  );
};

export const RequestIp: ParameterDecorator = (target, name, index) => {
  Reflect.defineMetadata(
    HTTP_KEY.Ip,
    {
      name: name,
      index: index,
    },
    target
  );
};

export const Req: ParameterDecorator = (target, name, index) => {
  Reflect.defineMetadata(
    HTTP_KEY.Req,
    {
      name: name,
      index: index,
    },
    target
  );
};

export const Res: ParameterDecorator = (target, name, index) => {
  Reflect.defineMetadata(
    HTTP_KEY.Res,
    {
      name: name,
      index: index,
    },
    target
  );
};
