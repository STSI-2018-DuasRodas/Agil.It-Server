import { DefaultOperationController } from "../controllers/DefaultOperation";
import { Collection } from "./Collection";

export class DefaultOperationCollection extends Collection {
    constructor() {
        super('/default-operations', DefaultOperationController);
        this.addBaseCrudRoutes();
    }
}