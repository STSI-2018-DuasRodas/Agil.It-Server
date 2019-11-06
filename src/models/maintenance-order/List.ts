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
    (orderEquipment) => orderEquipment.getMaintenanceOrderId,
    { cascade: true }
  )
  @JoinColumn()
  private orderEquipment: Array<OrderEquipment> = [];

  /**
   * Getter orderEquipment
   * @return {Array<OrderEquipment> }
   */
	public getOrderEquipment(): Array<OrderEquipment>  {
		return this.orderEquipment;
	}

  /**
   * Setter orderEquipment
   * @param {Array<OrderEquipment> } value
   */
	public setOrderEquipment(value: Array<OrderEquipment> ) {
		this.orderEquipment = value;
	}
}