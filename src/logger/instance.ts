import * as chalk from "chalk";

export interface ILogInstance {
  log<MESSAGE>(message: MESSAGE, source: string): void;
  error<MESSAGE>(message: MESSAGE, source: string): void;
  info<MESSAGE>(message: MESSAGE, source: string): void;
}

export class Logger implements ILogInstance {
  private readonly logger = console.log;
  private readonly prefix = "<✨Naily>";

  log<MESSAGE>(message: MESSAGE, source: string = "Nai"): void {
    this.logger(chalk.green(`${this.prefix} [${source}] ${message}`));
  }

  error<MESSAGE>(
    message: MESSAGE,
    source: string = "Nai ERR!",
    stack?: any
  ): void {
    const prefix = `${this.prefix} [${source}]`;
    this.logger(`${chalk.bgRedBright(prefix)} ${chalk.redBright(message)}`);
    if (stack) throw stack;
  }

  info<MESSAGE>(message: MESSAGE, source: string): void {
    this.logger(chalk.blue(`${this.prefix} [${source}] ${message}`));
  }
}
