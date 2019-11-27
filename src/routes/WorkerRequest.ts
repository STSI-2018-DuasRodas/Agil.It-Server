import { WorkerRequestController } from "../controllers/WorkerRequest";
import { Collection } from "./Collection";
import { ConfigCrudRoutes } from "./ConfigCrudRoutes";

export class WorkerRequestCollection extends Collection {
  constructor() {
    super('/maintenance-orders/:maintenanceOrderId/worker-requests', WorkerRequestController);
    this.addBaseCrudRoutes(new ConfigCrudRoutes())
  }

}