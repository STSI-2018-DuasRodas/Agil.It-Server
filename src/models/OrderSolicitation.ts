import { Entity } from "typeorm";
import { CrudClass } from "./CrudClass";

@Entity("order_solicitation")
export class Sector extends CrudClass {
  
  constructor(){
    super();
  }

}