import { SectorController } from "../controllers/Sector";
import { Collection } from "./Collection";

export class SectorCollection extends Collection {
    constructor() {
        super('/sectors', SectorController);
        this.addBaseCrudRoutes();
    }
}