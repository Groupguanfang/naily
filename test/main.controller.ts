import { Controller, Get } from "../src/decorator/http.decorator";

@Controller()
class Test {
  @Get()
  public getHello() {
    return "Hello world啊兄弟们";
  }
}

new Test();
import "../src/index";
