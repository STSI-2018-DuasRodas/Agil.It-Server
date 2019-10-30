import { ChildEntity } from "typeorm";
import { OrderOperation } from "./OrderOperation";

@ChildEntity()
export class Route extends OrderOperation {
  
}