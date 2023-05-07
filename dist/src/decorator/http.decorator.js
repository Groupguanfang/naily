"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = exports.Controller = exports.HTTP_KEY = exports.componentContiner = void 0;
require("reflect-metadata");
// 容器装载所有的类
exports.componentContiner = [];
var HTTP_KEY;
(function (HTTP_KEY) {
    HTTP_KEY["Controller"] = "controller";
    HTTP_KEY["Get"] = "get";
})(HTTP_KEY = exports.HTTP_KEY || (exports.HTTP_KEY = {}));
const Controller = function (path = "/") {
    return (target) => {
        // 为了不再index页面手动new 对象，采用类似spring容器的方式管理
        exports.componentContiner.push(target);
        // 反射会用到一些信息
        Reflect.defineMetadata(HTTP_KEY.Controller, { path, clazz: new target() }, target);
    };
};
exports.Controller = Controller;
const Get = (info = "/") => {
    return (target, methodName, desc) => {
        // 会用到原始函数
        Reflect.defineMetadata(HTTP_KEY.Get, {
            info,
            fn: desc.value,
        }, desc.value);
    };
};
exports.Get = Get;
