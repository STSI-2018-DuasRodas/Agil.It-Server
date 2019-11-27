import { WorkedTimeController } from "../controllers/WorkedTime";
import { Collection } from "./Collection";
import { ConfigCrudRoutes } from "./ConfigCrudRoutes";

export class WorkedTimeCollection extends Collection {
  constructor() {
    super('/maintenance-orders/:maintenanceOrderId/worked-times', WorkedTimeController);
    this.addBaseCrudRoutes(new ConfigCrudRoutes())
  }

}