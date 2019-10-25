import { Entity } from "typeorm";
import { CrudClass } from "./CrudClass";

@Entity("default_observation")
export class DefaultObservation  extends CrudClass {

  constructor(){
    super();
  }

}