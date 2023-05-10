import { IRouterHandler, IRouterMatcher } from "express-serve-static-core";
import type { DataSource, DataSourceOptions } from "typeorm";

export interface IMounted {
  boot(port: number, callBack?: Function): void;
  useMiddleware: IRouterHandler<this> & IRouterMatcher<this>;
  useFilter(filter: Function): this;
  useTypeORM(options: DataSourceOptions): Promise<DataSource>;
}
