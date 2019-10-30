import { Column, JoinColumn, OneToOne, Entity, TableInheritance } from "typeorm";
import { BaseClass } from "../BaseClass";
import { InstallationArea } from "../InstallationArea";
import { OrderType } from "../OrderType";
import { OrderClassification } from "../OrderClassification";
import { OrderPriority } from "./OrderPriority";

@Entity("maintenance_order")
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class MaintenanceOrder extends BaseClass {

  @Column()
  private orderNumber: string = '';

  @OneToOne(
    (type) => InstallationArea,
    (installationArea) => installationArea.getId,
    { nullable: false }
  )
  @JoinColumn()
  private installationArea: InstallationArea = new InstallationArea();

  @OneToOne(
    (type) => OrderType,
    (orderType) => orderType.getId,
    { nullable: false }
  )
  @JoinColumn()
  private orderType: OrderType = new OrderType();

  @OneToOne(
    (type) => OrderClassification,
    (orderClassification) => orderClassification.getId,
    { nullable: false }
  )
  @JoinColumn()
  private orderClassification: OrderClassification = new OrderClassification();

  @Column({
    type: "enum",
    enum: OrderPriority
  })
  private priority: OrderPriority = OrderPriority.LOW

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
   * Getter installationArea
   * @return {InstallationArea }
   */
	public getInstallationArea(): InstallationArea  {
		return this.installationArea;
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
   * Setter installationArea
   * @param {InstallationArea } value
   */
	public setInstallationArea(value: InstallationArea ) {
		this.installationArea = value;
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

}