import { ItemController } from "../controllers/Item";
import { Collection } from "./Collection";

export class ItemCollection extends Collection {
  constructor() {
    super('/items', ItemController);
    this.addBaseCrudRoutes();
  }
}