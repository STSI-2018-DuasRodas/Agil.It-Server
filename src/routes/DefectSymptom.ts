import { DefectSymptomController } from "../controllers/DefectSymptom";
import { Collection } from "./Collection";

export class DefectSymptomCollection extends Collection {
    constructor() {
        super('/defect-symptoms', DefectSymptomController);
        this.addBaseCrudRoutes();
    }
}