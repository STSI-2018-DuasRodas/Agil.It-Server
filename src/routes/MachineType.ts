import { MachineTypeController } from "../controllers/MachineType";
import { Collection } from "./Collection";

export class MachineTypeCollection extends Collection {
  constructor() {
    super('/machine-types', MachineTypeController);
    this.addBaseCrudRoutes();
  }
}