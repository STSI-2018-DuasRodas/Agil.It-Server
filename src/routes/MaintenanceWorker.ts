import { MaintenanceWorkerController } from "../controllers/MaintenanceWorker";
import { Collection } from "./Collection";
import { ConfigCrudRoutes } from "./ConfigCrudRoutes";
import { Method } from "./Method";
import { Route } from "./Route";

export class MaintenanceWorkerCollection extends Collection {
  constructor() {
    super('/order-mainteners', MaintenanceWorkerController);
    this.addBaseCrudRoutes(new ConfigCrudRoutes())
    this.loadRoutes();
  }

  private loadRoutes() {
    
    this.addRoute(new Route(
      Method.GET,
      `${this.getRouteWithId()}/worked-time`,
      this.getController(),
      'getMaintenerWorkedTime'
    ))
    
    this.addRoute(new Route(
      Method.GET,
      `${this.getRouteWithId()}/requests`,
      this.getController(),
      'getMaintenerRequests'
    ))
  }

}