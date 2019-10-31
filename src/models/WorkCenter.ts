import { CrudClass } from "./CrudClass";
import { Entity } from "typeorm";

@Entity("work_center")
export class WorkCenter extends CrudClass {

  constructor() {
    super();
  }
}