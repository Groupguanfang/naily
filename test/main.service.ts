import { Injectable } from "../src/main";
import { ChildService } from "./child.service";

// 使用Injectable标记这是一个可以被注入的类
// 说人话就两个字：服务
@Injectable
export class AppService {
  constructor(private readonly childService: ChildService) {}
  // 随便弄个方法
  getData() {
    return this.childService.ttt();
  }
}
