import { Method } from "./Method"
import { Route } from "./Route";
import { ConfigCrudRoutes } from "./ConfigCrudRoutes";

export class Collection {

  private route: string;
  private controller: any;
  private routes: Array<Route>;

  constructor(route: string, controller: any) {

		if (route.substr(0,1)!="/") {
			route = `/${route}`;
		}

    this.route = route;
		this.controller = controller;
		this.routes = [];
  }

	public getRoute(): string {
		return this.route;
	}

	public getRouteWithId() : string {
		return `${this.getRoute()}/:id`
	}
	public getController(): any {
		return this.controller;
	}

	public setRoute(value: string) {
		this.route = value;
	}

	public setController(value: any) {
		this.controller = value;
	}

	/**
	 * Getter routes
	 * @return {Array<Route>}
	 */
	public getRoutes(): Array<Route> {
		return this.routes;
	}

	/**
	 * Add route
	 * @param {Route} value
	 */
	public addRoute(value: Route) {
		this.routes.push(value);
	}

	public addBaseCrudRoutes(config: ConfigCrudRoutes = new ConfigCrudRoutes()) {

		// Get all records
		if (config.addGetAll) {
			this.addRoute(new Route(
				Method.GET,
				this.getRoute(),
				this.getController(),
				'all'
			))
		}
		
		// Get record by id
		if (config.addGetById) {
			this.addRoute(new Route(
				Method.GET,
				this.getRouteWithId(),
				this.getController(),
				'one'
			))
		}

		if (config.addPost) {
			this.addRoute(new Route(
				Method.POST,
				this.getRoute(),
				this.getController(),
				'save'
			))
		}
		
		if (config.addDelete) {
			this.addRoute(new Route(
				Method.DELETE,
				this.getRouteWithId(),
				this.getController(),
				'remove'
			))
		}
	}
}