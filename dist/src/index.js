"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("reflect-metadata");
const http_decorator_1 = require("./decorator/http.decorator");
require("./controller/user.controller");
const path_1 = require("path");
const app = express();
// 路由分配
http_decorator_1.componentContiner.forEach((item) => {
    // 获取Controller反射
    const { path, clazz } = Reflect.getMetadata(http_decorator_1.HTTP_KEY.Controller, item);
    // Controller类的原型
    const prototype = Object.getPrototypeOf(clazz);
    // 原型上的方法并过滤构造函数
    const methodNames = Object.getOwnPropertyNames(prototype).filter((item) => item !== "constructor");
    // 反射获取方法，并进行方法增强
    methodNames.forEach((element) => {
        const func = Reflect.getMetadata(http_decorator_1.HTTP_KEY.Get, prototype[element]);
        const { info, fn } = func;
        // 进行路由组装
        const getRoute = path.includes("/") ? path + info : `/${path}${info}`;
        // url路径拼接
        const urlPath = (0, path_1.join)("/" + path, info).replace(/\\/g, "/");
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
