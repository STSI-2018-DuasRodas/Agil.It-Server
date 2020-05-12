import { ChildEntity, OneToMany } from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";

@ChildEntity()
export class List extends MaintenanceOrder {
  
  constructor() {
    super();
  }

}