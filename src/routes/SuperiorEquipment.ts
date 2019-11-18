import { SuperiorEquipmentController } from "../controllers/SuperiorEquipment";
import { Collection } from "./Collection";

export class SuperiorEquipmentCollection extends Collection {
  constructor() {
    super('/superior-equipments', SuperiorEquipmentController);
    this.addBaseCrudRoutes();
  }
}