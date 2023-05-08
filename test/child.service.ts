import { Injectable } from "../src/main";
import { AService } from "./aa.service";

@Injectable
export class ChildService {
  constructor(private readonly aService: AService) {}
  ttt() {
    return this.aService.getText();
  }
}
