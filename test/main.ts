// 注入你写的控制器
import "./main.controller";
// 测试下注入数据库实体
import { Test } from "./models/test.entity";

// import进来监听函数
import app from "../src/app";
(async (app) => {
  await app.useTypeORM({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "naily",
    password: "14789632",
    database: "naily",
    logging: true,
    synchronize: false,
    entities: [Test],
  });
  app.boot(8000);
})(app);
