import { MeasurementUnitController } from "../controllers/MeasurementUnit";
import { Collection } from "./Collection";

export class MeasurementUnitCollection extends Collection {
  constructor() {
    super('/measurement-units', MeasurementUnitController);
    this.addBaseCrudRoutes();
  }
}