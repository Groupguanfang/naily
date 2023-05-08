import { Logger } from "../main";

export class ICoreError extends Error {
  constructor(message: string) {
    super(message);
    new Logger().error(message, undefined);
  }
}
