import { BaseClass } from "../BaseClass"
import { Entity, ManyToOne, Column, JoinColumn } from "typeorm"
import { Item } from "../Item";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { OrderOperation } from "./OrderOperation";

@Entity("order_component")
export class OrderComponent extends BaseClass {

  @ManyToOne(type => OrderOperation, orderOperation => orderOperation.getId, {cascade: false, nullable: true})
  @JoinColumn()
  private orderOperation : OrderOperation;

  @ManyToOne(type => Item, item => item.getId, {cascade: false, nullable: false})
  @JoinColumn()
  private item : Item;

  @Column({type: "int"})
  private quantity: number;

  @Column()
  private canBeDeleted: boolean;

  constructor() {
    super();
  }

  /**
   * Getter item
   * @return {Item}
   */
	public getItem(): Item {
		return this.item;
	}

  /**
   * Getter quantity
   * @return {number}
   */
	public getQuantity(): number {
		return this.quantity;
	}

  /**
   * Getter canBeDeleted
   * @return {boolean}
   */
	public getCanBeDeleted(): boolean {
		return this.canBeDeleted;
	}

  /**
   * Setter item
   * @param {Item} value
   */
	public setItem(value: Item) {
		this.item = value;
	}

  /**
   * Setter quantity
   * @param {number} value
   */
	public setQuantity(value: number) {
		this.quantity = value;
	}

  /**
   * Setter canBeDeleted
   * @param {boolean} value
   */
	public setCanBeDeleted(value: boolean) {
		this.canBeDeleted = value;
	}

  /**
   * Getter orderOperation
   * @return {OrderOperation}
   */
	public getOrderOperation(): OrderOperation {
		return this.orderOperation;
	}

  /**
   * Setter orderOperation
   * @param {OrderOperation} value
   */
	public setOrderOperation(value: OrderOperation) {
		this.orderOperation = value;
	}

}