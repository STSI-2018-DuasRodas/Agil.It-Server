import { ChildEntity } from "typeorm";
import { OrderOperation } from "./OrderOperation";

@ChildEntity()
export class List extends OrderOperation {
  
}