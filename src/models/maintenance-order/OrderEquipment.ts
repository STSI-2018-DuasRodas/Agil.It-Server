import { Equipment } from "../Equipment";
import { SuperiorEquipment } from "../SuperiorEquipment";
import { OneToOne, ManyToOne, Column, Entity, OneToMany, PrimaryColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { OrderOperation } from "./OrderOperation";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { InstallationArea } from "../InstallationArea";
import { BaseClass } from "../BaseClass";

@Entity('order_equipment')
export class OrderEquipment extends BaseClass {

  @ManyToOne(type => MaintenanceOrder, maintenanceOrder => maintenanceOrder.getId, {cascade: false, nullable: false})
  private maintenanceOrder : MaintenanceOrder;
  
  @ManyToOne( type => Equipment, equipment => equipment.getId, {cascade: false, nullable: false})
  private equipment: Equipment;
  
  @ManyToOne(
    (type) => SuperiorEquipment,
    (superiorEquipment) => superiorEquipment.getId,
    { nullable: true }
  )
  private superiorEquipment: SuperiorEquipment;

  @ManyToOne(
    (type) => InstallationArea,
    (installationArea) => installationArea.getId,
    { nullable: false, cascade: false }
  )
  private installationArea: InstallationArea;
  
  @OneToMany(type => OrderOperation, orderOperation => orderOperation.getOrderEquipment, {onDelete: "CASCADE"})
  private orderOperation: Array<OrderOperation>;

  constructor() {
    super();
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
   * @return {Equipment}
   */
	public getEquipment(): Equipment {
		return this.equipment;
	}

  /**
   * Getter superiorEquipment
   * @return {SuperiorEquipment}
   */
	public getSuperiorEquipment(): SuperiorEquipment {
		return this.superiorEquipment;
	}

  /**
   * Getter installationArea
   * @return {InstallationArea}
   */
public getInstallationArea(): InstallationArea {
		return this.installationArea;
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
   * Setter equipment
   * @param {Equipment} value
   */
	public setEquipment(value: Equipment) {
		this.equipment = value;
	}

  /**
   * Setter superiorEquipment
   * @param {SuperiorEquipment} value
   */
	public setSuperiorEquipment(value: SuperiorEquipment) {
		this.superiorEquipment = value;
	}

  /**
   * Setter installationArea
   * @param {InstallationArea} value
   */
	public setInstallationArea(value: InstallationArea) {
		this.installationArea = value;
	}

  /**
   * Setter orderOperation
   * @param {Array<OrderOperation>} value
   */
	public setOrderOperation(value: Array<OrderOperation>) {
		this.orderOperation = value;
	}

}