import { BaseClass } from "../BaseClass";
import { OneToOne, Column, JoinColumn, Entity } from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { DefectOrigin } from "../DefectOrigin";
import { DefectSymptom } from "../DefectSymptom";

@Entity("order_problem")
export class OrderProblem extends BaseClass {
  
  @OneToOne(type => MaintenanceOrder, maintenanceOrder => maintenanceOrder.getId, {cascade: false, nullable: false})
  @JoinColumn({name:"maintenanceOrderId"})
  private maintenanceOrder : MaintenanceOrder;

  @OneToOne(
    (type) => DefectOrigin,
    (defectOrigin) => defectOrigin.getId,
    { nullable: true }
  )
  private defectOrigin: DefectOrigin;

  @Column({
    type: 'varchar',
    length:'255'
  })
  private defectOriginNote: string = '';

  @OneToOne(
    (type) => DefectSymptom,
    (defectSymptom) => defectSymptom.getId,
    { nullable: true }
  )
  private defectSymptom: DefectSymptom;

  @Column({
    type: 'varchar',
    length:'255'
  })
  private defectSymptomNote: string = '';

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
   * Getter defectOrigin
   * @return {DefectOrigin}
   */
	public getDefectOrigin(): DefectOrigin {
		return this.defectOrigin;
	}

  /**
   * Getter defectOriginNote
   * @return {string }
   */
	public getDefectOriginNote(): string  {
		return this.defectOriginNote;
	}

  /**
   * Getter defectSymptom
   * @return {DefectSymptom}
   */
	public getDefectSymptom(): DefectSymptom {
		return this.defectSymptom;
	}

  /**
   * Getter defectSymptomNote
   * @return {string }
   */
	public getDefectSymptomNote(): string  {
		return this.defectSymptomNote;
	}

  /**
   * Setter maintenanceOrder
   * @param {MaintenanceOrder} value
   */
	public setMaintenanceOrder(value: MaintenanceOrder) {
		this.maintenanceOrder = value;
	}

  /**
   * Setter defectOrigin
   * @param {DefectOrigin} value
   */
	public setDefectOrigin(value: DefectOrigin) {
		this.defectOrigin = value;
	}

  /**
   * Setter defectOriginNote
   * @param {string } value
   */
	public setDefectOriginNote(value: string ) {
		this.defectOriginNote = value;
	}

  /**
   * Setter defectSymptom
   * @param {DefectSymptom} value
   */
	public setDefectSymptom(value: DefectSymptom) {
		this.defectSymptom = value;
	}

  /**
   * Setter defectSymptomNote
   * @param {string } value
   */
	public setDefectSymptomNote(value: string ) {
		this.defectSymptomNote = value;
	}

}