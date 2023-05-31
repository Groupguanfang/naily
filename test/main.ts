// 注入你写的控制器
import "./main.controller";
// 所有控制器导入之后再导入此装饰器！
import { BootNailyApplication, type CanBoot, IMount } from "../src/app";

@BootNailyApplication
export class Booter implements CanBoot {
  // 实现了main函数
  main(app: IMount): void {
    app.boot(8000);
  }
}
