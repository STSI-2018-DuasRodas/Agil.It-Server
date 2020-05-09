import { OrderOperationController } from "../controllers/OrderOperation";
import { Collection } from "./Collection";
import { ConfigCrudRoutes } from "./ConfigCrudRoutes";
import { Method } from "./Method";
import { Route } from "./Route";

export class OrderOperationCollection extends Collection {
  constructor() {
    super('/order-operations', OrderOperationController);
    this.addBaseCrudRoutes(new ConfigCrudRoutes())
    this.loadRoutes();
  }

  private loadRoutes() {
    
    this.addRoute(new Route(
      Method.GET,
      `${this.getRouteWithId()}/components`,
      this.getController(),
      'getOperationComponents'
    ))
  }

}