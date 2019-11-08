import { DefectOriginController } from "../controllers/DefectOrigin";
import { Collection } from "./Collection";

export class DefectOriginCollection extends Collection {
    constructor() {
        super('/defect-origins', DefectOriginController);
        this.addBaseCrudRoutes();
    }
}