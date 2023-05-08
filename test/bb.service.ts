import { Injectable } from "../src/main";
import { CService } from "./cc.service";

@Injectable
export class BService {
  constructor(private readonly cService: CService) {}
  public getText() {
    return "访问到了CService";
  }
}
