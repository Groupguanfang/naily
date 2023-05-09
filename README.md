# Naily（Nai Core）

基于 Express 实现了一个简易的，无模块系统的 Nest.js。

自动依赖注入特性+无模块系统，企业级开发就算啦，写着玩的，代码写得很垃圾。

## 使用

> 只支持 `TypeScript`，没去特别适配 JavaScript 和 Babel 转译器。如果使用有问题别问我（

### 安装

必须有`node^12` + `npm` + `npx`环境，然后运行 cli 命令：

```sh
npx naily
```

### 一个简单的小示例

`main.ts`

```typescript
// 注入你写的控制器
// 必须在导入app对象之前导入 才能被检测到并挂载
import "./main.controller";
import "./xxxxxxx";

// 所有控制器都import进来之后 再在最后import app
import app from "naily/app";

app
  // 使用useMiddleware创建中间件
  .useMiddleware((req, res, next) => {
    // 这里编写您的中间件...
  })
  // 使用useFilter将在全局挂载Filter
  .useFilter(MyFilter)
  // 最后使用boot启动服务器
  .boot(8000);
```

`main.controller.ts`

```typescript
// 导入控制器注解和GET方法注解
import { GetMapping, RequestIp, RestController } from "naily";
// 导入一个服务
import { AppService } from "./main.service";

// 这里导出一个类 用controller装饰起来～
@RestController()
export class AppController {
  // 这里注入一个服务～
  constructor(private readonly appService: AppService) {}
  // 这里用get装饰起来～
  @GetMapping()
  // 使用@RequestIp可以获取到请求发出地的IP地址哦
  public getHello(@RequestIp ip: string) {
    // 返回一个JSON对象吧
    return {
      ip: ip,
      data: this.appService.getData(),
      message: "Hello world",
    };
  }
}
```

`main.service.ts`

```typescript
import { Injectable } from "naily";

// 使用Injectable标记这是一个可以被注入的类
// 说人话就两个字：服务
@Injectable
export class AppService {
  // 随便弄个方法
  getData() {
    return 200;
  }
}
```

### 装饰器列表

| 装饰器           | 说明                              |
| ---------------- | --------------------------------- |
| `RestController` | 控制器 标识一个控制器必须要用这个 |
| `GetMapping`     | 标识 GET 方法装饰器               |
| `PostMapping`    | 标识 POST 方法装饰器              |
| `OptionsMapping` | 标识 Options 方法装饰器           |
| `PutMapping`     | 标识 Put 方法装饰器               |
| `PatchMapping`   | 标识 Patch 方法装饰器             |
| `DeleteMapping`  | 标识 Delete 方法装饰器            |
| `RequestMapping` | 匹配所有方法装饰器                |
| `RequestQuery`   | 获取 URL Query 装饰器             |
| `RequestParam`   | 获取 URL Param 装饰器             |
| `RequestBody`    | 获取 URL Body 装饰器              |
| `RequestIp`      | 获取 Ip 地址 装饰器               |
| `UseFilter`      | 使用错误过滤器 ｜                 |

## 错误过滤器

参考`test/main.filter.ts`。

## 感谢

- [源码基于`JYbill/implement-nestjs-controller-get`大佬修改而成](https://github.com/JYbill/implement-nestjs-controller-get)
