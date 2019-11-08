import { OrderClassificationController } from "../controllers/OrderClassification";
import { Collection } from "./Collection";

export class OrderClassificationCollection extends Collection {
  constructor() {
    super('/order-classifications', OrderClassificationController);
    this.addBaseCrudRoutes();
  }
}