import { Entity } from "typeorm";
import { OrderOperation } from "./OrderOperation";

@Entity("maintenance_order_operation_default")
export class Default extends OrderOperation {
  
}