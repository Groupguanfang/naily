import "reflect-metadata";
export declare const componentContiner: any[];
export declare enum HTTP_KEY {
    Controller = "controller",
    Get = "get"
}
export declare const Controller: (path?: string) => ClassDecorator;
export declare const Get: (info?: string) => MethodDecorator;
