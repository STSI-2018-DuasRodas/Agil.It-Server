import { WorkCenter } from './../WorkCenter';
import { Column, ManyToOne, Entity, TableInheritance, OneToMany, JoinColumn } from "typeorm";
import { BaseClass } from "../BaseClass";
import { OrderPriority } from "../enum/OrderPriority";
import { MaintenanceWorker } from "./MaintenanceWorker";
import { OrderStatus } from "../enum/OrderStatus";
import { OrderLayout } from "../OrderLayout";
import { OrderSignature } from "./OrderSignature";
import { OrderEquipment } from "./OrderEquipment";
import { IsNotEmpty } from "class-validator";
import { User } from "../User";

@Entity("maintenance_order")
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class MaintenanceOrder extends BaseClass {

  
  @Column()
  @IsNotEmpty({
    message:'Número da Ordem: Campo obrigatório.'
  })
  public orderNumber: string = '';

  @Column()
  public description: string = '';

  @ManyToOne(
    (type) => OrderLayout,
    (orderLayout) => orderLayout.id,
    { nullable: false, cascade: false }
  )
  @JoinColumn()
  @IsNotEmpty({
    message:'Layout da Ordem: Campo obrigatório.'
  })
  public orderLayout: OrderLayout | undefined = undefined;

  @Column({
    type: "enum",
    enum: OrderPriority,
    default: OrderPriority.LOW
  })
  public priority: OrderPriority = OrderPriority.LOW

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.CREATED
  })
  public orderStatus: OrderStatus = OrderStatus.CREATED

  @Column()
  public needStopping: boolean = false;

  @Column()
  public isStopped: boolean = false;

  @OneToMany(type => MaintenanceWorker, maintenanceWorker => maintenanceWorker.maintenanceOrder, { cascade: false, nullable: true })
  public maintenanceWorker: Array<MaintenanceWorker>;
  
  @OneToMany(type => OrderSignature, orderSignature => orderSignature.maintenanceOrder, { cascade: false, nullable: true })
  public orderSignature: Array<OrderSignature>;

  @Column({ type: 'boolean', default: false })
  public exported: boolean = false;

  @Column()
  public openedDate: Date = new Date();
  
  @OneToMany(type => OrderEquipment, orderEquipment => orderEquipment.maintenanceOrder, { cascade: true,  nullable: true })
  public orderEquipment: Array<OrderEquipment>;
  
  @ManyToOne(
    (type) => User,
    (solicitationUser) => solicitationUser.id,
    { nullable: false, cascade: false }
  )
  @JoinColumn()
  @IsNotEmpty({
    message:'Solicitante da Ordem de Manutenção: Campo obrigatório.'
  })
  public solicitationUser: User = undefined;

  @ManyToOne(
    (type) => WorkCenter,
    (workCenter) => workCenter.id,
    { nullable: false, cascade: false }
  )
  @JoinColumn()
  @IsNotEmpty({
    message:'Centro de Trabalho: Campo obrigatório.'
  })
  public workCenter: WorkCenter = undefined;

  constructor() {
    super();
  }

}