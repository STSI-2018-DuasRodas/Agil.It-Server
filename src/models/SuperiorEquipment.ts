import { Entity } from "typeorm";
import { CrudClass } from "./CrudClass";

@Entity("superior_equipment")
export class SuperiorEquipment extends CrudClass {

  constructor() {
    super();
  }

}