# Naily（Nai Core）

基于 Express 实现了一个简易的，无模块系统的 Nest.js。

自动依赖注入特性+无模块系统，企业级开发就算啦，写着玩的，代码写得很垃圾。

## 使用

> 只支持 `TypeScript`，没去特别适配 JavaScript 和 Babel 转译器。如果使用有问题别问我（

### 一个简单的小示例

`main.ts`

```typescript
// 注入你写的控制器
import "./main.controller";
// import进来监听函数
import app from "naily/app";
app.listen(8000, () => console.log("app已在8000端口启动"));
```

`main.controller.ts`

```typescript
// 导入控制器注解和GET方法注解
import { GetMapping, Ip, RestController } from "naily";
// 导入一个服务
import { AppService } from "./main.service";

// 这里导出一个类 用controller装饰起来～
@RestController()
export class AppController {
  // 这里注入一个服务～
  constructor(private readonly appService: AppService) {}
  // 这里用get装饰起来～
  @GetMapping()
  public getHello(@Ip ip: string) {
    // 返回一个JSON对象吧
    return {
      statusCode: this.appService.getData(),
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
| `Query`          | 获取 URL Query 装饰器             |
| `Param`          | 获取 URL Param 装饰器             |
| `Body`           | 获取 URL Body 装饰器              |
| `Ip`             | 获取 URL Ip 装饰器                |

## 感谢

- [源码基于`JYbill/implement-nestjs-controller-get`大佬修改而成](https://github.com/JYbill/implement-nestjs-controller-get)
