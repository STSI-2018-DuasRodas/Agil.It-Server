import { Entity, Column } from "typeorm";
import { BaseClass } from "./BaseClass";
import {OrderLayout as EnumOrderLayout} from "./enum/OrderLayout"
import { IsNotEmpty } from "class-validator";

@Entity("order_layout")
export class OrderLayout extends BaseClass {

  @Column({
    type: "enum",
    enum: EnumOrderLayout,
    nullable: false
  })
  @IsNotEmpty({
    message:'Layout não definido.'
  })
  public orderLayout: EnumOrderLayout = undefined;

  @Column()
  public type: string = undefined;
  
  @Column()
  public classification: string = undefined;

}