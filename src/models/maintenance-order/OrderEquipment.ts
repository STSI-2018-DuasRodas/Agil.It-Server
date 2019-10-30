import { Equipment } from "../Equipment";
import { SuperiorEquipment } from "../SuperiorEquipment";
import { OneToOne, JoinColumn, Column, Entity } from "typeorm";
import { DefectOrigin } from "../DefectOrigin";
import { DefectSymptom } from "../DefectSymptom";
import { BaseClass } from "../BaseClass";

@Entity('order_equipment')
export class OrderEquipment extends BaseClass {

  @OneToOne(
    (type) => Equipment,
    (equipment) => equipment.getId,
    { nullable: false }
  )
  @JoinColumn()
  private equipment: Equipment = new Equipment();
  
  @OneToOne(
    (type) => SuperiorEquipment,
    (superiorEquipment) => superiorEquipment.getId,
    { nullable: true }
  )
  @JoinColumn()
  private superiorEquipment: SuperiorEquipment = new SuperiorEquipment();

  @OneToOne(
    (type) => DefectOrigin,
    (defectOrigin) => defectOrigin.getId,
    { nullable: true }
  )
  @JoinColumn()
  private defectOrigin: DefectOrigin = null;

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
  @JoinColumn()
  private defectSymptom: DefectSymptom = null;

  @Column({
    type: 'varchar',
    length:'255'
  })
  private defectSymptomNote: string = '';

  constructor() {
    super();
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
   * Getter defectOrigin
   * @return {DefectOrigin }
   */
	public getDefectOrigin(): DefectOrigin  {
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
   * @return {DefectSymptom }
   */
	public getDefectSymptom(): DefectSymptom  {
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
   * Setter defectOrigin
   * @param {DefectOrigin } value
   */
	public setDefectOrigin(value: DefectOrigin ) {
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
   * @param {DefectSymptom } value
   */
	public setDefectSymptom(value: DefectSymptom ) {
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