import { WorkCenterController } from "../controllers/WorkCenter";
import { Collection } from "./Collection";

export class WorkCenterCollection extends Collection {
  constructor() {
    super('/work-centers', WorkCenterController);
    this.addBaseCrudRoutes();
  }
}