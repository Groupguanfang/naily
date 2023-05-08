import { Injectable } from "../src/main";

@Injectable
export class CService {
  public getText() {
    return "访问到了CService";
  }
}
