import { Entity, ManyToOne, JoinColumn, Column, OneToOne, OneToMany } from "typeorm";
import { CrudClass } from "../CrudClass";
import { OrderEquipment } from "./OrderEquipment";
import { DefaultObservation } from "../DefaultObservation";
import { OrderComponent } from "./OrderComponent";

@Entity("order_operation")
export class OrderOperation extends CrudClass {

  @ManyToOne(type => OrderEquipment, orderEquipment => orderEquipment.id, {cascade: false, nullable: true})
  @JoinColumn()
  public orderEquipment: OrderEquipment = undefined;

  @OneToMany(type => OrderComponent, orderComponent => orderComponent.orderOperation, { cascade: false, nullable: true })
  public orderComponent: Array<OrderComponent>;

  @Column()
  public operationNumber: number = undefined;

  @Column({ type: "int" })
  public planningTime: number = 0;

  @Column({ type: "int" })
  public executeTime: number = 0;

  @Column()
  public executed: boolean = false;

  @Column({
    type: 'varchar',
    length: '255'
  })
  public note: string;

  @ManyToOne(type => DefaultObservation, defaultObservation => defaultObservation.id, { nullable: true })
  @JoinColumn()
  public defaultObservation: DefaultObservation | null = null

  constructor() {
    super();
  }

}