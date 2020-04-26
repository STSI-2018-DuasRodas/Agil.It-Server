import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { MeasurementUnit } from "./MeasurementUnit";
import { CrudClass } from "./CrudClass";

@Entity("item")
export class Item extends CrudClass {

  @ManyToOne(
    (type) => MeasurementUnit,
    (measurementUnit) => measurementUnit.id,
    { nullable: false },
  )
  @JoinColumn()
  public measurementUnit: MeasurementUnit;

  constructor() {
    super();
  }

}