import { Column, OneToOne, Entity, TableInheritance, OneToMany } from "typeorm";
import { BaseClass } from "../BaseClass";
import { InstallationArea } from "../InstallationArea";
import { OrderType } from "../OrderType";
import { OrderClassification } from "../OrderClassification";
import { OrderPriority } from "../enum/OrderPriority";
import { MaintenanceWorker } from "./MaintenanceWorker";
import { OrderProblem } from "./OrderProblem";
import { OrderComponent } from "./OrderComponent";
import { OrderStatus } from "../enum/OrderStatus";
import { OrderLayout } from "../OrderLayout";

@Entity("maintenance_order")
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class MaintenanceOrder extends BaseClass {

  @Column()
  private orderNumber: string = '';

  @OneToOne(
    (type) => OrderType,
    (orderType) => orderType.getId,
    { nullable: false, cascade: false }
  )
  private orderType: OrderType = new OrderType();

  @OneToOne(
    (type) => OrderClassification,
    (orderClassification) => orderClassification.getId,
    { nullable: false, cascade: false }
  )
  private orderClassification: OrderClassification = new OrderClassification();

  @OneToOne(
    (type) => OrderLayout,
    (orderLayout) => orderLayout.getId,
    { nullable: false, cascade: false }
  )
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
  private needStopping : boolean = true;

  @Column()
  private isStopped : boolean = true;

  @OneToMany(type => MaintenanceWorker, maintenanceWorker => maintenanceWorker.getMaintenanceOrder)
  private maintenanceWorker: Array<MaintenanceWorker>;

  @OneToOne(type => OrderProblem, orderProblem => orderProblem.getMaintenanceOrder, {cascade: false, nullable: true})
  private orderProblem : OrderProblem;

  @OneToMany(type => OrderComponent, orderComponent => orderComponent.getMaintenanceOrder, {cascade: false, nullable: true})
  private orderComponent : Array<OrderComponent>;

  @Column({type: 'boolean', default: false})
  private exported : boolean = false;

  constructor() {
    super();
  }

  /**
   * Getter orderNumber
   * @return {string }
   */
  public getOrderNumber(): string  {
    return this.orderNumber;
  }

  /**
   * Setter orderNumber
   * @param {string } value
   */
  public setOrderNumber(value: string ) {
    this.orderNumber = value;
  }

  /**
   * Getter orderType
   * @return {OrderType }
   */
	public getOrderType(): OrderType  {
		return this.orderType;
	}

  /**
   * Getter orderClassification
   * @return {OrderClassification }
   */
	public getOrderClassification(): OrderClassification  {
		return this.orderClassification;
	}

  /**
   * Getter priority
   * @return {OrderPriority }
   */
	public getPriority(): OrderPriority  {
		return this.priority;
	}

  /**
   * Getter maintenanceWorker
   * @return {Array<MaintenanceWorker>}
   */
	public getMaintenanceWorker(): Array<MaintenanceWorker> {
		return this.maintenanceWorker;
	}

  /**
   * Setter orderType
   * @param {OrderType } value
   */
	public setOrderType(value: OrderType ) {
		this.orderType = value;
	}

  /**
   * Setter orderClassification
   * @param {OrderClassification } value
   */
	public setOrderClassification(value: OrderClassification ) {
		this.orderClassification = value;
	}

  /**
   * Setter priority
   * @param {OrderPriority } value
   */
	public setPriority(value: OrderPriority ) {
		this.priority = value;
	}

  /**
   * Getter isStopped
   * @return {boolean }
   */
	public getIsStopped(): boolean  {
		return this.isStopped;
	}

  /**
   * Setter isStopped
   * @param {boolean } value
   */
	public setIsStopped(value: boolean ) {
		this.isStopped = value;
	}

  /**
   * Setter maintenanceWorker
   * @param {Array<MaintenanceWorker>} value
   */
	public setMaintenanceWorker(value: Array<MaintenanceWorker>) {
		this.maintenanceWorker = value;
	}

  /**
   * Getter needStopping
   * @return {boolean }
   */
	public getNeedStopping(): boolean  {
		return this.needStopping;
	}

  /**
   * Setter needStopping
   * @param {boolean } value
   */
	public setNeedStopping(value: boolean ) {
		this.needStopping = value;
	}

  /**
   * Getter orderProblem
   * @return {OrderProblem}
   */
	public getOrderProblem(): OrderProblem {
		return this.orderProblem;
	}

  /**
   * Setter orderProblem
   * @param {OrderProblem} value
   */
	public setOrderProblem(value: OrderProblem) {
		this.orderProblem = value;
	}

  /**
   * Getter orderComponent
   * @return {Array<OrderComponent>}
   */
	public getOrderComponent(): Array<OrderComponent> {
		return this.orderComponent;
	}

  /**
   * Setter orderComponent
   * @param {Array<OrderComponent>} value
   */
	public setOrderComponent(value: Array<OrderComponent>) {
		this.orderComponent = value;
	}

  /**
   * Getter orderStatus
   * @return {OrderStatus }
   */
	public getOrderStatus(): OrderStatus  {
		return this.orderStatus;
	}

  /**
   * Setter orderStatus
   * @param {OrderStatus } value
   */
	public setOrderStatus(value: OrderStatus ) {
		this.orderStatus = value;
	}

  /**
   * Getter exported
   * @return {boolean }
   */
	public getExported(): boolean  {
		return this.exported;
	}

  /**
   * Setter exported
   * @param {boolean } value
   */
	public setExported(value: boolean ) {
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

}