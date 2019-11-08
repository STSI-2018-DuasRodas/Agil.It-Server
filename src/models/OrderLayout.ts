import { Entity, Column } from "typeorm";
import { CrudClass } from "./CrudClass";
import {OrderLayout as EnumOrderLayout} from "./enum/OrderLayout"

@Entity("order_layout")
export class OrderLayout extends CrudClass {

  @Column({
    type: "enum",
    enum: EnumOrderLayout,
    nullable: false
  })
  private orderLayout: EnumOrderLayout;

  /**
   * Getter orderLayout
   * @return {EnumOrderLayout}
   */
	public getOrderLayout(): EnumOrderLayout {
		return this.orderLayout;
	}

  /**
   * Setter orderLayout
   * @param {EnumOrderLayout} value
   */
	public setOrderLayout(value: EnumOrderLayout) {
		this.orderLayout = value;
	}

}