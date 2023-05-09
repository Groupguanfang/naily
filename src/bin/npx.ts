import inquirer = require("inquirer");
import chalk = require("chalk");
import ora = require("ora");
import { join } from "path";
import { download, extract } from "gitly";
import { execSync } from "child_process";
import content from "./content";

interface IPrompt {
  projectName: string;
  packageManager: "npm" | "yarn" | "pnpm" | "cnpm";
}

const LIST: inquirer.QuestionCollection = [
  {
    type: "input",
    message: "请输入项目名称:",
    name: "projectName",
  },
  {
    type: "list",
    message: "请选择包管理器:",
    name: "packageManager",
    choices: ["npm", "yarn", "pnpm", "cnpm"],
  },
];

async function downloadRepo(options: IPrompt): Promise<boolean> {
  const loading = ora("开始下载...☕️~").start();
  try {
    const CURRENT_PATH = process.cwd();
    const FILE_PATH = join(CURRENT_PATH, options.projectName);
    const source = await download("Groupguanfang/naily-starter");
    await extract(source, FILE_PATH);
    loading.start("正在安装...☕️~");
    execSync(
      `cd ${FILE_PATH} && ${options.packageManager}` +
        (options.packageManager === "yarn" ? "" : " install")
    );
    loading.succeed("✨安装完成");
    return true;
  } catch (err) {
    console.error(err);
    loading.start("Nai ERR! 失败 请检查网络状况后重试！");
    return err;
  }
}

async function main(): Promise<void> {
  console.log(content);
  console.log();
  const answer = await inquirer.prompt<IPrompt>(LIST);
  await downloadRepo(answer);
}
main();
