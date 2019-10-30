import { CrudClass } from "../CrudClass";
import { Entity, TableInheritance } from "typeorm";

@Entity("order_operation")
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class OrderOperation extends CrudClass {
  
  constructor(){
    super();
  }

}