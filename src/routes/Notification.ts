import { NotificationController } from "../controllers/Notification";
import { Collection } from "./Collection";

export class NotificationCollection extends Collection {
    constructor() {
        super('/notifications', NotificationController);
        this.addBaseCrudRoutes();
    }
}