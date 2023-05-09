import { IRouterHandler, IRouterMatcher } from "express-serve-static-core";

export interface IMounted {
  boot(port: number, callBack?: Function): void;
  useMiddleware: IRouterHandler<this> & IRouterMatcher<this>;
  useFilter(filter: Function): this;
}
