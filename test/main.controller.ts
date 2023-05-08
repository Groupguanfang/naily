// 导入控制器注解和GET方法注解
import { GetMapping, Logger, RestController } from "../src/main";
import { AppService } from "./main.service";

// 这里导出一个类 用controller装饰起来～
@RestController()
export class AppController {
  // 这里注入一个服务～
  constructor(private readonly appService: AppService) {}
  // 这里用get装饰起来～
  @GetMapping()
  public getHello() {
    new Logger().info("测试一下哈～", "A Request");
    // 返回一个JSON对象吧
    return {
      statusCode: 200,
      message: "hello",
    };
  }
}
