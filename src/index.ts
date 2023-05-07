import * as express from "express";
import "reflect-metadata";
import { componentContiner, HTTP_KEY } from "./decorator/http.decorator";
import "./controller/user.controller";
import { join } from "path";

const app = express();

// 路由分配
componentContiner.forEach((item) => {
  // 获取Controller反射
  const { path, clazz } = Reflect.getMetadata(HTTP_KEY.Controller, item);

  // Controller类的原型
  const prototype = Object.getPrototypeOf(clazz);

  // 原型上的方法并过滤构造函数
  const methodNames = Object.getOwnPropertyNames(prototype).filter(
    (item) => item !== "constructor"
  );

  // 反射获取方法，并进行方法增强
  methodNames.forEach((element) => {
    const func = Reflect.getMetadata(HTTP_KEY.Get, prototype[element]);
    const { info, fn } = func;

    // 进行路由组装
    const getRoute = path.includes("/") ? path + info : `/${path}${info}`;

    // url路径拼接
    const urlPath = join("/" + path, info).replace(/\\/g, "/");

    app.get(urlPath, (req, res) => {
      const ret = fn();
      res.send(ret);
    });
  });
});

app.listen(8000, () => {
  // 设置端口号
  console.log("app is running, port is 8000");
});
