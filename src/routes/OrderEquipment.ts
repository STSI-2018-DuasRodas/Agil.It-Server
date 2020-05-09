import { OrderEquipmentController } from "../controllers/OrderEquipment";
import { Collection } from "./Collection";
import { ConfigCrudRoutes } from "./ConfigCrudRoutes";
import { Method } from "./Method";
import { Route } from "./Route";

export class OrderEquipmentCollection extends Collection {
  constructor() {
    super('/order-equipments', OrderEquipmentController);
    this.addBaseCrudRoutes(new ConfigCrudRoutes());
    this.loadRoutes();
  }

  private loadRoutes() {
    
    this.addRoute(new Route(
      Method.GET,
      `${this.getRouteWithId()}/operations`,
      this.getController(),
      'getEquipmentOperations'
    ))
  }

}