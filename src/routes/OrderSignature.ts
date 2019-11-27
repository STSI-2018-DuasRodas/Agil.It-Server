import { OrderSignatureController } from "../controllers/OrderSignature";
import { Collection } from "./Collection";
import { ConfigCrudRoutes } from "./ConfigCrudRoutes";

export class OrderSignatureCollection extends Collection {
  constructor() {
    super('/maintenance-orders/:maintenanceOrderId/signatures', OrderSignatureController);
    this.addBaseCrudRoutes(new ConfigCrudRoutes())
  }

}