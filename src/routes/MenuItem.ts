import { MenuItemController } from "../controllers/MenuItem";
import { Collection } from "./Collection";
import { ConfigCrudRoutes } from "./ConfigCrudRoutes";

export class MenuItemCollection extends Collection {
    constructor() {
        super('/menu-items', MenuItemController);
        this.addBaseCrudRoutes(new ConfigCrudRoutes(true, false, false, false, false));
    }
}