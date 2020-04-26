import { BaseClass } from "../BaseClass"
import { Entity, ManyToOne, Column, JoinColumn } from "typeorm"
import { Item } from "../Item";
import { OrderOperation } from "./OrderOperation";

@Entity("order_component")
export class OrderComponent extends BaseClass {

  @ManyToOne(type => OrderOperation, orderOperation => orderOperation.id, {cascade: false, nullable: true})
  @JoinColumn()
  public orderOperation : OrderOperation;

  @ManyToOne(type => Item, item => item.id, {cascade: false, nullable: false})
  @JoinColumn()
  public item : Item;

  @Column({type: "int"})
  public quantity: number;

  @Column()
  public canBeDeleted: boolean;

  constructor() {
    super();
  }

}