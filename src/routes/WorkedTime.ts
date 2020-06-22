import { WorkedTimeController } from "../controllers/WorkedTime";
import { Collection } from "./Collection";
import { ConfigCrudRoutes } from "./ConfigCrudRoutes";

export class WorkedTimeCollection extends Collection {
  constructor() {
    super('/worked-times', WorkedTimeController);
    this.addBaseCrudRoutes(new ConfigCrudRoutes())
  }

}