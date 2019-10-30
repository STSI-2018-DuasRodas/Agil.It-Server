import { ChildEntity } from "typeorm";
import { OrderOperation } from "./OrderOperation";

@ChildEntity()
export class Default extends OrderOperation {
  
}