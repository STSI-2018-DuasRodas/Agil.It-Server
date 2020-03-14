import { ChildEntity, OneToOne, Column, ManyToOne } from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { OrderEquipment } from "./OrderEquipment";
import { DefectOrigin } from "../DefectOrigin";
import { DefectSymptom } from "../DefectSymptom";

@ChildEntity()
export class Default extends MaintenanceOrder {

  constructor() {
    super();
  }

  @OneToOne(
    (type) => OrderEquipment,
    (orderEquipment) => orderEquipment.getId,
    { cascade: true }
  )
  private orderEquipment: OrderEquipment;

  @ManyToOne(
    (type) => DefectOrigin,
    (defectOrigin) => defectOrigin.getId,
    { nullable: true }
  )
  private defectOrigin: DefectOrigin;

  @Column({
    type: 'varchar',
    length: '255'
  })
  private defectOriginNote: string = '';

  @ManyToOne(
    (type) => DefectSymptom,
    (defectSymptom) => defectSymptom.getId,
    { nullable: true }
  )
  private defectSymptom: DefectSymptom;

  @Column({
    type: 'varchar',
    length: '255'
  })
  private defectSymptomNote: string = '';

  /**
   * Getter orderEquipment
   * @return {OrderEquipment }
   */
  public getOrderEquipment(): OrderEquipment {
    return this.orderEquipment;
  }

  /**
   * Setter orderEquipment
   * @param {OrderEquipment } value
   */
  public setOrderEquipment(value: OrderEquipment) {
    this.orderEquipment = value;
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
  public getDefectOriginNote(): string {
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
  public getDefectSymptomNote(): string {
    return this.defectSymptomNote;
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
  public setDefectOriginNote(value: string) {
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
  public setDefectSymptomNote(value: string) {
    this.defectSymptomNote = value;
  }

}