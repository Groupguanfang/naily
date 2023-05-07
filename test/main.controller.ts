// 导入控制器注解和GET方法注解
import { GetMapping, RestController } from "../src/main";

// 这里导出一个类 用controller装饰起来
@RestController()
export class AppController {
  // 这里用get装饰起来
  @GetMapping()
  public async getHello() {
    // 返回一个JSON对象
    return {
      statusCode: 200,
    };
  }
}
