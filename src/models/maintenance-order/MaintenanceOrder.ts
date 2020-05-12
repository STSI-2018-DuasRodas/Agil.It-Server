import { Column, ManyToOne, Entity, TableInheritance, OneToMany, JoinColumn } from "typeorm";
import { BaseClass } from "../BaseClass";
import { OrderType } from "../OrderType";
import { OrderClassification } from "../OrderClassification";
import { OrderPriority } from "../enum/OrderPriority";
import { MaintenanceWorker } from "./MaintenanceWorker";
import { OrderStatus } from "../enum/OrderStatus";
import { OrderLayout } from "../OrderLayout";
import { OrderSignature } from "./OrderSignature";
import { OrderEquipment } from "./OrderEquipment";
import { DefectSymptom } from "../DefectSymptom";
import { DefectOrigin } from "../DefectOrigin";

@Entity("maintenance_order")
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class MaintenanceOrder extends BaseClass {

  @Column()
  public orderNumber: string = '';

  @ManyToOne(
    (type) => OrderType,
    (orderType) => orderType.id,
    { nullable: false, cascade: false }
  )
  @JoinColumn()
  public orderType: OrderType = new OrderType();

  @ManyToOne(
    (type) => OrderClassification,
    (orderClassification) => orderClassification.id,
    { nullable: false, cascade: false }
  )
  @JoinColumn()
  public orderClassification: OrderClassification = new OrderClassification();

  @ManyToOne(
    (type) => OrderLayout,
    (orderLayout) => orderLayout.id,
    { nullable: false, cascade: false }
  )
  @JoinColumn()
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
    (type) => DefectOrigin,
    (defectOrigin) => defectOrigin.id,
    { nullable: true }
  )
  @JoinColumn()
  public defectOrigin: DefectOrigin | undefined = undefined;

  @Column({
    type: 'varchar',
    length: '255'
  })
  public defectOriginNote: string = '';

  @ManyToOne(
    (type) => DefectSymptom,
    (defectSymptom) => defectSymptom.id,
    { nullable: true }
  )
  @JoinColumn()
  public defectSymptom: DefectSymptom | undefined = undefined;

  @Column({
    type: 'varchar',
    length: '255'
  })
  public defectSymptomNote: string = '';

  constructor() {
    super();
  }
  
}