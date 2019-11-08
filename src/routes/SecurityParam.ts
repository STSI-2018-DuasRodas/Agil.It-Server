import { SecurityParamController } from "../controllers/SecurityParam";
import { Collection } from "./Collection";

export class SecurityParamCollection extends Collection {
  constructor() {
    super('/security-params', SecurityParamController);
    this.addBaseCrudRoutes();
  }
}