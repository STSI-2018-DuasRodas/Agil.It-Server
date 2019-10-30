import { ChildEntity, OneToOne, JoinColumn } from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { OrderEquipment } from "./OrderEquipment";

@ChildEntity()
export class Default extends MaintenanceOrder {
  
  constructor() {
    super();
  }

  @OneToOne(
    (type) => OrderEquipment,
    (orderEquipment) => orderEquipment.getId,
    { nullable: false, cascade: true }
  )
  @JoinColumn()
  private orderEquipment: OrderEquipment = new OrderEquipment();
  
}