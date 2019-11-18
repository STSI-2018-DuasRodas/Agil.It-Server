import { MachineComponentController } from "../controllers/MachineComponent";
import { Collection } from "./Collection";

export class MachineComponentCollection extends Collection {
  constructor() {
    super('/machine-components', MachineComponentController);
    this.addBaseCrudRoutes();
  }
}