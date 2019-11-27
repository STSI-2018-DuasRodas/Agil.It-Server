import { OrderEquipmentController } from "../controllers/OrderEquipment";
import { Collection } from "./Collection";
import { ConfigCrudRoutes } from "./ConfigCrudRoutes";

export class OrderEquipmentCollection extends Collection {
  constructor() {
    super('/maintenance-orders/:maintenanceOrderId/equipments', OrderEquipmentController);
    this.addBaseCrudRoutes(new ConfigCrudRoutes())
  }

}