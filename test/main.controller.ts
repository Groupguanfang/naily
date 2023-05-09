// 导入控制器注解和GET方法注解
import {
  GetMapping,
  HttpException,
  RestController,
  UseFilter,
} from "../src/main";
import { AnyFilter, CustomFilter } from "./main.filter";
import { AppService } from "./main.service";

// 这里导出一个类 用controller装饰起来～
@RestController()
export class AppController {
  // 这里注入一个服务～
  constructor(private readonly appService: AppService) {}
  // 这里用get装饰起来～
  @GetMapping()
  public getHello() {
    // 返回一个JSON对象吧
    return {
      statusCode: 200,
      message: "Hello world～",
    };
  }

  @GetMapping("testError")
  @UseFilter(AnyFilter)
  @UseFilter(CustomFilter)
  public testError() {
    // 测试一下错误
    return {
      // @ts-ignore
      code: aaa,
    };
  }
}
