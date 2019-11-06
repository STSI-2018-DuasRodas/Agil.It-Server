import { Entity, ManyToOne, JoinColumn, Column, OneToOne } from "typeorm";
import { CrudClass } from "../CrudClass";
import { OrderEquipment } from "./OrderEquipment";
import { Item } from "../Item";

@Entity("order_operation")
export abstract class OrderOperation extends CrudClass {
  
  @ManyToOne(type => OrderEquipment, orderEquipment => orderEquipment.getOrderOperation, {cascade: false})
  @JoinColumn([
    {name: "maintenanceOrderId", referencedColumnName: "maintenanceOrderId"},
    {name: "equipmentId", referencedColumnName: "equipmentId"}
  ])
  private orderEquipment: OrderEquipment;
  
  @OneToOne(type => Item, item => item.getId)
  @JoinColumn({name: 'itemId'})
  private item: Item;

  @Column()
  private operationNumber: string;

  @Column({type: "int"})
  private planningTime: number;
  
  @Column({type: "int"})
  private executeTime: number;

  @Column()
  private executed: boolean;

  @Column({
    type: 'varchar',
    length:'255'
  })
  private note: string;

  constructor() {
    super();
  }

  /**
   * Getter orderEquipment
   * @return {OrderEquipment}
   */
	public getOrderEquipment(): OrderEquipment {
		return this.orderEquipment;
	}

  /**
   * Setter orderEquipment
   * @param {OrderEquipment} value
   */
	public setOrderEquipment(value: OrderEquipment) {
		this.orderEquipment = value;
	}

}