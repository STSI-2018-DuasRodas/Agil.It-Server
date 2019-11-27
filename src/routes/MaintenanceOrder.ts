import { MaintenanceOrderController } from "../controllers/MaintenanceOrder";
import { Collection } from "./Collection";
import { Route } from "./Route";
import { Method } from "./Method";

export class MaintenanceOrderCollection extends Collection {
  constructor() {
    super('/maintenance-orders', MaintenanceOrderController);
    this.loadRoutes()

  }

  private loadRoutes() :void {
    
    this.addRoute(new Route(
      Method.GET,
      '/api/v1/mainteners/:id/orders',
      this.getController(),
      'getOrdersByMaintener'
    ))

    this.addRoute(new Route(
      Method.GET,
      this.getRouteWithId(),
      this.getController(),
      'getOrder'
    ))
        
    this.addRoute(new Route(
      Method.POST,
      this.getRoute(),
      this.getController(),
      'createOrder'
    ))

    this.addRoute(new Route(
      [Method.PUT, Method.PATCH],
      this.getRouteWithId(),
      this.getController(),
      'updateOrder'
    ))
    
    this.addRoute(new Route(
      Method.DELETE,
      this.getRouteWithId(),
      this.getController(),
      'deleteOrder'
    ))
  }
}