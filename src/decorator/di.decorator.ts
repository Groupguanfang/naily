import "reflect-metadata";

export enum DI_KEY {
  Injectable = "injectable",
}

export const Injectable: ClassDecorator = (target) => {
  Reflect.defineMetadata(DI_KEY.Injectable, true, target);
  console.log("监测到服务" + target.name + "已发现");
};
