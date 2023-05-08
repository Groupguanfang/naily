import { Injectable } from "../src/main";
import { CService } from "./cc.service";

@Injectable
export class DService {
  public getText() {
    return "访问到了DService";
  }
}
