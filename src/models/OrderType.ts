import { Entity } from "typeorm";
import { CrudClass } from "./CrudClass";

@Entity("order_type")
export class OrderType extends CrudClass {
  
  constructor() {
    super();
  }

}