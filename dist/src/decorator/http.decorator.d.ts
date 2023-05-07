import "reflect-metadata";
export declare const componentContiner: any[];
export declare enum HTTP_KEY {
    Controller = "controller",
    Get = "get",
    Post = "post",
    Query = "query",
    Param = "param",
    Body = "body"
}
export interface IControllerMetadata {
    path: string;
    clazz: any;
}
export declare const NestController: (path?: string) => ClassDecorator;
export interface IMethodMetadata {
    info: string;
    fn: Function;
}
export declare const GetMapping: (info?: string) => MethodDecorator;
export declare const PostMapping: (info?: string) => MethodDecorator;
export interface IParameterMetadata {
    name: string;
    index: number;
}
export declare const Query: ParameterDecorator;
export declare const Param: ParameterDecorator;
export declare const Body: ParameterDecorator;
