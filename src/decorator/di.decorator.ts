import "reflect-metadata";
import { Logger } from "../main";

export enum DI_KEY {
  Injectable = "injectable",
}

export const Injectable: ClassDecorator = (target) => {
  Reflect.defineMetadata(DI_KEY.Injectable, true, target);
  new Logger().log(`检测到服务：${target.name}已发现`);
};
