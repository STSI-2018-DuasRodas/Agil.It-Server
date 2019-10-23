import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn} from "typeorm";
import { OrderOperation } from "./OrderOperation";

@Entity("maintenance_order_operation_route")
export class Route extends OrderOperation {
  
}