// 注入你写的控制器
import "./main.controller";
// import进来监听函数
import app from "../src/app";
app.listen(8000, () => console.log("app已在8000端口启动"));
