import { Entity } from "typeorm";
import { CrudClass } from "./CrudClass";

@Entity("sector")
export class Sector extends CrudClass {
  
  constructor(){
    super();
  }

}