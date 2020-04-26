import { ChildEntity } from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";

@ChildEntity()
export class Route extends MaintenanceOrder {
  
  constructor() {
    super();
  }

}