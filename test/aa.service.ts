import { Injectable } from "../src/main";
import { BService } from "./bb.service";

@Injectable
export class AService {
  constructor(private readonly bService: BService) {}
  public getText() {
    return this.bService.getText();
  }
}
