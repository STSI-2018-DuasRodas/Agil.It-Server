import { Entity } from "typeorm";
import { CrudClass } from "./CrudClass";

@Entity("machine_type")
export class MachineType extends CrudClass {

  constructor() {
    super();
  }

}