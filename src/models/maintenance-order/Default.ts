import { Entity } from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";

@Entity("maintenance_order_default")
export class Default extends MaintenanceOrder {
  
  constructor() {
    super();
  }
  
}