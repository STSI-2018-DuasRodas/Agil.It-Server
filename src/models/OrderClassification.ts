import { Entity } from "typeorm";
import { CrudClass } from "./CrudClass";

@Entity("order_classification")
export class OrderClassification extends CrudClass {
  
  constructor(){
    super();
  }

}