import { DefaultObservationController } from "../controllers/DefaultObservation";
import { Collection } from "./Collection";

export class DefaultObservationCollection extends Collection {
    constructor() {
        super('/default-observations', DefaultObservationController);
        this.addBaseCrudRoutes();
    }
}