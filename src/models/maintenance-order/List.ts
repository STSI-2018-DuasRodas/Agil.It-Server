import { ChildEntity, OneToMany, JoinColumn } from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { OrderEquipment } from "./OrderEquipment";

@ChildEntity()
export class List extends MaintenanceOrder {
  
  constructor() {
    super();
  }
  
  @OneToMany(
    (type) => OrderEquipment,
    (orderEquipment) => orderEquipment.getId,
    { nullable: false, cascade: true }
  )
  @JoinColumn()
  private orderEquipment: Array<OrderEquipment> = [];

}