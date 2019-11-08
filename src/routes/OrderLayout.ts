import { OrderLayoutController } from "../controllers/OrderLayout";
import { Collection } from "./Collection";

export class OrderLayoutCollection extends Collection {
  constructor() {
    super('/order-layouts', OrderLayoutController);
    this.addBaseCrudRoutes();
  }
}