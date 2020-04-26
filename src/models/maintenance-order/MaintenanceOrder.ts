import { Column, ManyToOne, Entity, TableInheritance, OneToMany, JoinColumn } from "typeorm";
import { BaseClass } from "../BaseClass";
import { OrderType } from "../OrderType";
import { OrderClassification } from "../OrderClassification";
import { OrderPriority } from "../enum/OrderPriority";
import { MaintenanceWorker } from "./MaintenanceWorker";
import { OrderComponent } from "./OrderComponent";
import { OrderStatus } from "../enum/OrderStatus";
import { OrderLayout } from "../OrderLayout";
import { OrderSignature } from "./OrderSignature";
import { OrderEquipment } from "./OrderEquipment";

@Entity("maintenance_order")
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class MaintenanceOrder extends BaseClass {

  @Column()
  private orderNumber: string = '';

  @ManyToOne(
    (type) => OrderType,
    (orderType) => orderType.getId,
    { nullable: false, cascade: false }
  )
  @JoinColumn()
  private orderType: OrderType = new OrderType();

  @ManyToOne(
    (type) => OrderClassification,
    (orderClassification) => orderClassification.getId,
    { nullable: false, cascade: false }
  )
  @JoinColumn()
  private orderClassification: OrderClassification = new OrderClassification();

  @ManyToOne(
    (type) => OrderLayout,
    (orderLayout) => orderLayout.getId,
    { nullable: false, cascade: false }
  )
  @JoinColumn()
  private orderLayout: OrderLayout;

  @Column({
    type: "enum",
    enum: OrderPriority,
    default: OrderPriority.LOW
  })
  private priority: OrderPriority = OrderPriority.LOW

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.CREATED
  })
  private orderStatus: OrderStatus = OrderStatus.CREATED

  @Column()
  private needStopping: boolean = true;

  @Column()
  private isStopped: boolean = true;

  @OneToMany(type => MaintenanceWorker, maintenanceWorker => maintenanceWorker.getMaintenanceOrder, { cascade: false, nullable: true })
  private maintenanceWorker: Array<MaintenanceWorker> | null = null;
  
  @OneToMany(type => OrderSignature, orderSignature => orderSignature.getMaintenanceOrder, { cascade: false, nullable: true })
  private orderSignature: Array<OrderSignature>;

  @Column({ type: 'boolean', default: false })
  private exported: boolean = false;

  @Column()
  private openedDate: Date;
  
  @OneToMany(type => OrderEquipment, orderEquipment => orderEquipment.getMaintenanceOrder, { cascade: true,  nullable: true })
  private orderEquipment: Array<OrderEquipment>;
  
  constructor() {
    super();
  }

  /**
   * Getter orderNumber
   * @return {string }
   */
  public getOrderNumber(): string {
    return this.orderNumber;
  }

  /**
   * Setter orderNumber
   * @param {string } value
   */
  public setOrderNumber(value: string) {
    this.orderNumber = value;
  }

  /**
   * Getter orderType
   * @return {OrderType }
   */
  public getOrderType(): OrderType {
    return this.orderType;
  }

  /**
   * Getter orderClassification
   * @return {OrderClassification }
   */
  public getOrderClassification(): OrderClassification {
    return this.orderClassification;
  }

  /**
   * Getter priority
   * @return {OrderPriority }
   */
  public getPriority(): OrderPriority {
    return this.priority;
  }

  /**
   * Getter maintenanceWorker
   * @return {Array<MaintenanceWorker> | null}
   */
  public getMaintenanceWorker(): Array<MaintenanceWorker> | null {
    return this.maintenanceWorker;
  }

  /**
   * Setter orderType
   * @param {OrderType } value
   */
  public setOrderType(value: OrderType) {
    this.orderType = value;
  }

  /**
   * Setter orderClassification
   * @param {OrderClassification } value
   */
  public setOrderClassification(value: OrderClassification) {
    this.orderClassification = value;
  }

  /**
   * Setter priority
   * @param {OrderPriority } value
   */
  public setPriority(value: OrderPriority) {
    this.priority = value;
  }

  /**
   * Getter isStopped
   * @return {boolean }
   */
  public getIsStopped(): boolean {
    return this.isStopped;
  }

  /**
   * Setter isStopped
   * @param {boolean } value
   */
  public setIsStopped(value: boolean) {
    this.isStopped = value;
  }

  /**
   * Setter maintenanceWorker
   * @param {Array<MaintenanceWorker> | null} value
   */
  public setMaintenanceWorker(value: Array<MaintenanceWorker> | null) {
    this.maintenanceWorker = value;
  }

  /**
   * Getter needStopping
   * @return {boolean }
   */
  public getNeedStopping(): boolean {
    return this.needStopping;
  }

  /**
   * Setter needStopping
   * @param {boolean } value
   */
  public setNeedStopping(value: boolean) {
    this.needStopping = value;
  }
  
  /**
   * Getter orderSignature
   * @return {Array<OrderSignature>}
   */
  public getOrderSignature(): Array<OrderSignature> {
    return this.orderSignature;
  }

  /**
   * Setter orderSignature
   * @param {Array<OrderSignature>} value
   */
  public setOrderSignature(value: Array<OrderSignature>) {
    this.orderSignature = value;
  }

  /**
   * Getter orderStatus
   * @return {OrderStatus }
   */
  public getOrderStatus(): OrderStatus {
    return this.orderStatus;
  }

  /**
   * Setter orderStatus
   * @param {OrderStatus } value
   */
  public setOrderStatus(value: OrderStatus) {
    this.orderStatus = value;
  }

  /**
   * Getter exported
   * @return {boolean }
   */
  public getExported(): boolean {
    return this.exported;
  }

  /**
   * Setter exported
   * @param {boolean } value
   */
  public setExported(value: boolean) {
    this.exported = value;
  }

  /**
   * Getter orderLayout
   * @return {OrderLayout}
   */
  public getOrderLayout(): OrderLayout {
    return this.orderLayout;
  }

  /**
   * Setter orderLayout
   * @param {OrderLayout} value
   */
  public setOrderLayout(value: OrderLayout) {
    this.orderLayout = value;
  }


  /**
   * Getter openedDate
   * @return {Date}
   */
  public getOpenedDate(): Date {
    return this.openedDate;
  }

  /**
   * Setter openedDate
   * @param {Date} value
   */
  public setOpenedDate(value: Date) {
    this.openedDate = value;
  }
  
  /**
   * Getter orderEquipment
   * @return {Array<OrderEquipment> }
   */
	public getOrderEquipment(): Array<OrderEquipment>  {
		return this.orderEquipment;
	}

  /**
   * Setter orderEquipment
   * @param {Array<OrderEquipment> } value
   */
	public setOrderEquipment(value: Array<OrderEquipment> ) {
		this.orderEquipment = value;
	}

}