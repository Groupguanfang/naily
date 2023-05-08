import { Injectable } from "../src/main";
import { DService } from "./dd.service";

@Injectable
export class CService {
  constructor(private readonly dService: DService) {}
  public getText() {
    return this.dService.getText();
  }
}
