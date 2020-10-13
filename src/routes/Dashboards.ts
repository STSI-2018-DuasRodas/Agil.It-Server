import { DashboardsController } from "../controllers/Dashboards";
import { Collection } from "./Collection";
import { Route } from "./Route";
import { Method } from "./Method";

export class DashboardsCollection extends Collection {
  constructor() {
    super('/dashboards', DashboardsController);

    this.addRoute(new Route(
      Method.GET,
      `${this.getRoute()}/pending-orders`,
      this.getController(),
      'getAdminDashboard'
    ))
  }
}