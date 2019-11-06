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
    (orderEquipment) => orderEquipment.getMaintenanceOrderId,
    { cascade: true }
  )
  private orderEquipment: OrderEquipment;
  
  /**
   * Getter orderEquipment
   * @return {OrderEquipment }
   */
	public getOrderEquipment(): OrderEquipment  {
		return this.orderEquipment;
	}

  /**
   * Setter orderEquipment
   * @param {OrderEquipment } value
   */
	public setOrderEquipment(value: OrderEquipment ) {
		this.orderEquipment = value;
	}

}