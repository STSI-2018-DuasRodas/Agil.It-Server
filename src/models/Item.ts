import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { MeasurementUnit } from "./MeasurementUnit";
import { CrudClass } from "./CrudClass";

@Entity("item")
export class Item extends CrudClass {

  @ManyToOne(
    (type) => MeasurementUnit,
    (measurementUnit) => measurementUnit.getId,
    { nullable: false },
  )
  @JoinColumn()
  private measurementUnit: MeasurementUnit;

  constructor() {
    super();
  }

  /**
   * Getter measurementUnit
   * @return {MeasurementUnit }
   */
	public getMeasurementUnit(): MeasurementUnit  {
		return this.measurementUnit;
	}

  /**
   * Setter measurementUnit
   * @param {MeasurementUnit } value
   */
	public setMeasurementUnit(value: MeasurementUnit ) {
		this.measurementUnit = value;
	}
}