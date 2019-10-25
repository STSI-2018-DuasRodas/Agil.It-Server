import { Entity } from "typeorm";
import { CrudClass } from "./CrudClass";

@Entity("default_operation")
export class DefaultOperation extends CrudClass {

  constructor() {
    super();
  }

}