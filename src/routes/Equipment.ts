import { EquipmentController } from "../controllers/Equipment";
import { Collection } from "./Collection";

export class EquipmentCollection extends Collection {
    constructor() {
        super('/equipments', EquipmentController);
        this.addBaseCrudRoutes();
    }
}