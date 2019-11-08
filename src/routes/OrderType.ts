import { OrderTypeController } from "../controllers/OrderType";
import { Collection } from "./Collection";

export class OrderTypeCollection extends Collection {
  constructor() {
    super('/order-types', OrderTypeController);
    this.addBaseCrudRoutes();
  }
}