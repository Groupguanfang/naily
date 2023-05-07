"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("reflect-metadata");
const http_decorator_1 = require("./decorator/http.decorator");
const get_1 = require("./router/get");
const app = express();
http_decorator_1.componentContiner.forEach((item) => {
    const controllerMetadata = Reflect.getMetadata(http_decorator_1.HTTP_KEY.Controller, item);
    const prototype = Object.getPrototypeOf(controllerMetadata.clazz);
    const methodNames = Object.getOwnPropertyNames(prototype).filter((item) => item !== "constructor");
    methodNames.forEach((element) => {
        const methodPOSTData = Reflect.getMetadata(http_decorator_1.HTTP_KEY.Post, prototype[element]);
        (0, get_1.initeGET)(prototype, element, controllerMetadata, app);
    });
});
app.listen(8000, () => console.log("已启动"));
//# sourceMappingURL=index.js.map