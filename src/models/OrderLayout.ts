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
  public orderLayout: EnumOrderLayout = undefined;

}