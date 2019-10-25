import { Entity } from "typeorm";
import { CrudClass } from "./CrudClass";

@Entity("measurement_unit")
export class MeasurementUnit extends CrudClass {

  constructor(){
    super();
  }

}