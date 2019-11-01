import {MenuItemController} from "../controllers/MenuItemController";
import { Collection } from "./Collection";
import { ConfigCrudRoutes } from "./ConfigCrudRoutes";

export class MenuItemCollection extends Collection {
    constructor() {
        super('/menuItems', MenuItemController);
        this.addBaseCrudRoutes(new ConfigCrudRoutes(true, false, false, false, false));
    }
}