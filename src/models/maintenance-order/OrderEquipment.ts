import { Equipment } from "../Equipment";
import { SuperiorEquipment } from "../SuperiorEquipment";
import { OneToOne, Column, Entity, OneToMany, PrimaryColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { OrderOperation } from "./OrderOperation";
import { MaintenanceOrder } from "./MaintenanceOrder";

@Entity('order_equipment')
export class OrderEquipment {

  @PrimaryColumn()
  private maintenanceOrderId : number;
  
  @PrimaryColumn()
  private equipmentId: number;

  @OneToOne(type => MaintenanceOrder, maintenanceOrder => maintenanceOrder.getId, {cascade: false, nullable: false})
  private maintenanceOrder : MaintenanceOrder;
  
  @OneToOne( type => Equipment, equipment => equipment.getId, {cascade: false, nullable: false})
  private equipment: Equipment;
  
  @OneToOne(
    (type) => SuperiorEquipment,
    (superiorEquipment) => superiorEquipment.getId,
    { nullable: true }
  )
  private superiorEquipment: SuperiorEquipment;

  @OneToMany(type => OrderOperation, orderOperation => orderOperation.getOrderEquipment, {onDelete: "CASCADE"})
  private orderOperation: Array<OrderOperation>;

  @CreateDateColumn()
  private createdAt: Date | undefined;

  @Column()
  private createdBy: number | undefined;

  @UpdateDateColumn()
  private updatedAt: Date | undefined;

  @Column()
  private updatedBy: number | undefined;

  @Column({
    type: Boolean,
    default: false
  })
  private deleted: boolean = false;

  constructor() {
  }

  /**
   * Getter maintenanceOrder
   * @return {MaintenanceOrder}
   */
	public getMaintenanceOrder(): MaintenanceOrder {
		return this.maintenanceOrder;
  }
  
  /**
   * Getter equipment
   * @return {Equipment }
   */
	public getEquipment(): Equipment  {
		return this.equipment;
	}

  /**
   * Getter superiorEquipment
   * @return {SuperiorEquipment }
   */
	public getSuperiorEquipment(): SuperiorEquipment  {
		return this.superiorEquipment;
	}

  /**
   * Setter equipment
   * @param {Equipment } value
   */
	public setEquipment(value: Equipment ) {
		this.equipment = value;
	}

  /**
   * Setter superiorEquipment
   * @param {SuperiorEquipment } value
   */
	public setSuperiorEquipment(value: SuperiorEquipment ) {
		this.superiorEquipment = value;
  }

  /**
   * Getter orderOperation
   * @return {Array<OrderOperation>}
   */
	public getOrderOperation(): Array<OrderOperation> {
		return this.orderOperation;
	}

  /**
   * Setter maintenanceOrder
   * @param {MaintenanceOrder} value
   */
	public setMaintenanceOrder(value: MaintenanceOrder) {
		this.maintenanceOrder = value;
	}

  /**
   * Setter orderOperation
   * @param {Array<OrderOperation>} value
   */
	public setOrderOperation(value: Array<OrderOperation>) {
		this.orderOperation = value;
	}

  /**
   * Getter maintenanceOrderId
   * @return {number}
   */
	public getMaintenanceOrderId(): number {
		return this.maintenanceOrderId;
	}

  /**
   * Setter maintenanceOrderId
   * @param {number} value
   */
	public setMaintenanceOrderId(value: number) {
		this.maintenanceOrderId = value;
	}

  /**
   * Getter equipmentId
   * @return {number}
   */
	public getEquipmentId(): number {
		return this.equipmentId;
	}

  /**
   * Setter equipmentId
   * @param {number} value
   */
	public setEquipmentId(value: number) {
		this.equipmentId = value;
	}

  /**
   * Getter createdAt
   * @return {Date }
   */
	public getCreatedAt(): Date  {
		return this.createdAt;
	}

  /**
   * Getter createdBy
   * @return {number }
   */
	public getCreatedBy(): number  {
		return this.createdBy;
	}

  /**
   * Getter updatedAt
   * @return {Date }
   */
	public getUpdatedAt(): Date  {
		return this.updatedAt;
	}

  /**
   * Getter updatedBy
   * @return {number }
   */
	public getUpdatedBy(): number  {
		return this.updatedBy;
	}

  /**
   * Getter deleted
   * @return {boolean }
   */
	public getDeleted(): boolean  {
		return this.deleted;
	}

  /**
   * Setter createdAt
   * @param {Date } value
   */
	public setCreatedAt(value: Date ) {
		this.createdAt = value;
	}

  /**
   * Setter createdBy
   * @param {number } value
   */
	public setCreatedBy(value: number ) {
		this.createdBy = value;
	}

  /**
   * Setter updatedAt
   * @param {Date } value
   */
	public setUpdatedAt(value: Date ) {
		this.updatedAt = value;
	}

  /**
   * Setter updatedBy
   * @param {number } value
   */
	public setUpdatedBy(value: number ) {
		this.updatedBy = value;
	}

  /**
   * Setter deleted
   * @param {boolean } value
   */
	public setDeleted(value: boolean ) {
		this.deleted = value;
  }

}