import { MaintenanceWorkerController } from "../controllers/MaintenanceWorker";
import { Collection } from "./Collection";
import { ConfigCrudRoutes } from "./ConfigCrudRoutes";

export class MaintenanceWorkerCollection extends Collection {
  constructor() {
    super('/maintenance-orders/:maintenanceOrderId/workers', MaintenanceWorkerController);
    this.addBaseCrudRoutes(new ConfigCrudRoutes(true,false))
  }

}