import { Entity } from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";

@Entity("maintenance_order_list")
export class List extends MaintenanceOrder {
  
  constructor() {
    super();
  }
  
}