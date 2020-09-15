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
      `${this.getRouteWithId()}/mainteners`,
      this.getController(),
      'getOrderMainteners'
    ))

    this.addRoute(new Route(
      Method.GET,
      `${this.getRouteWithId()}/equipments`,
      this.getController(),
      'getOrderEquipments'
    ))
    
    this.addRoute(new Route(
      Method.GET,
      `${this.getRouteWithId()}/signatures`,
      this.getController(),
      'getOrderSignatures'
    ))
    
    this.addRoute(new Route(
      Method.POST,
      `${this.getRouteWithId()}/signatures`,
      this.getController(),
      'asignOrderRequst'
    ))
    
    this.addRoute(new Route(
      Method.PUT,
      `${this.getRouteWithId()}/status`,
      this.getController(),
      'updateStatusRequest'
    ))

    this.addRoute(new Route(
      Method.GET,
      this.getRoute(),
      this.getController(),
      'all'
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