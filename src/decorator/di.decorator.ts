import "reflect-metadata";
import { Logger } from "../main";

// 这是DI键
export enum DI_KEY {
  Injectable = "injectable",
}

// Injectable不需要太多的限制
// 如果需要模块系统那这里就得大改了 我没弄模块系统 所以就直接注入了
// ESModule就是最好的模块 要啥飞机 代码人写的 限制太多就没意思啦
// 限制太多不就变成Angular/Spring（？哈哈哈
export const Injectable: ClassDecorator = (target) => {
  // 所以我就直接返回一个true值 注明这是一个Injectable就行
  Reflect.defineMetadata(DI_KEY.Injectable, true, target);
  new Logger().log(`检测到服务：${target.name}已发现`);
};
