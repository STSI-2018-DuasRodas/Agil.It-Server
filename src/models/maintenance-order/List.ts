import { ChildEntity, OneToMany } from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { OrderEquipment } from "./OrderEquipment";

@ChildEntity()
export class List extends MaintenanceOrder {
  
  constructor() {
    super();
  }

}