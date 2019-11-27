import { OrderSafetyParamsController } from "../controllers/OrderSafetyParams";
import { Collection } from "./Collection";
import { Route } from "./Route";
import { Method } from "./Method";

export class OrderSafetyParamsCollection extends Collection {
  constructor() {
    super('/maintenance-orders/:maintenanceOrderId/safety-params', OrderSafetyParamsController);
    this.loadRoutes()
  }

  private loadRoutes() :void {
    this.addRoute(new Route(
      Method.GET,
      this.getRoute(),
      this.getController(),
      'getOrderSafetyParams'
    ))
  }
}