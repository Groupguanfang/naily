"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Body = exports.Param = exports.Query = exports.PostMapping = exports.GetMapping = exports.NestController = exports.HTTP_KEY = exports.componentContiner = void 0;
require("reflect-metadata");
exports.componentContiner = [];
var HTTP_KEY;
(function (HTTP_KEY) {
    HTTP_KEY["Controller"] = "controller";
    HTTP_KEY["Get"] = "get";
    HTTP_KEY["Post"] = "post";
    HTTP_KEY["Query"] = "query";
    HTTP_KEY["Param"] = "param";
    HTTP_KEY["Body"] = "body";
})(HTTP_KEY = exports.HTTP_KEY || (exports.HTTP_KEY = {}));
const NestController = function (path = "/") {
    return (target) => {
        exports.componentContiner.push(target);
        Reflect.defineMetadata(HTTP_KEY.Controller, {
            path,
            clazz: new target(),
        }, target);
    };
};
exports.NestController = NestController;
const GetMapping = (info = "/") => {
    return (target, methodName, desc) => {
        Reflect.defineMetadata(HTTP_KEY.Get, {
            info,
            fn: desc.value,
        }, desc.value);
    };
};
exports.GetMapping = GetMapping;
const PostMapping = (info = "/") => {
    return (target, methodName, desc) => {
        Reflect.defineMetadata(HTTP_KEY.Post, {
            info,
            fn: desc.value,
        }, desc.value);
    };
};
exports.PostMapping = PostMapping;
const Query = (target, name, index) => {
    Reflect.defineMetadata(HTTP_KEY.Query, {
        name: name,
        index: index,
    }, target);
};
exports.Query = Query;
const Param = (target, name, index) => {
    Reflect.defineMetadata(HTTP_KEY.Param, {
        name: name,
        index: index,
    }, target);
};
exports.Param = Param;
const Body = (target, name, index) => {
    Reflect.defineMetadata(HTTP_KEY.Body, {
        name: name,
        index: index,
    }, target);
};
exports.Body = Body;
//# sourceMappingURL=http.decorator.js.map