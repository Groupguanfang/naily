// 注入你写的控制器
import "./main.controller";
// import进来监听函数
import app from "../src/app";
app
  .useMiddleware("/", (req, res) => {})
  .useMiddleware()
  .useMiddleware()
  .listen(8000);
