import { ChildEntity, OneToMany, Column, ManyToOne, JoinColumn } from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { OrderEquipment } from "./OrderEquipment";
import { DefectOrigin } from "../DefectOrigin";
import { DefectSymptom } from "../DefectSymptom";

@ChildEntity()
export class Default extends MaintenanceOrder {

  constructor(
    defectOrigin: DefectOrigin | undefined = undefined,
    defectOriginNote: string | undefined = undefined,
    defectSymptom: DefectSymptom | undefined = undefined,
    defectSymptomNote: string | undefined = undefined,
  ) {
    super();
    this.defectOrigin = defectOrigin;
    this.defectOriginNote = defectOriginNote;
    this.defectSymptom = defectSymptom;
    this.defectSymptomNote = defectSymptomNote;
  }

  @ManyToOne(
    (type) => DefectOrigin,
    (defectOrigin) => defectOrigin.getId,
    { nullable: true }
  )
  @JoinColumn()
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
  @JoinColumn()
  private defectSymptom: DefectSymptom;

  @Column({
    type: 'varchar',
    length: '255'
  })
  private defectSymptomNote: string = '';

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