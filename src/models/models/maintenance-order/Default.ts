import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn} from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";

@Entity("maintenance_order_default")
export class Default extends MaintenanceOrder {
  
}