import { InstallationAreaController } from "../controllers/InstallationArea";
import { Collection } from "./Collection";

export class InstallationAreaCollection extends Collection {
  constructor() {
    super('/installation-areas', InstallationAreaController);
    this.addBaseCrudRoutes();
  }
}