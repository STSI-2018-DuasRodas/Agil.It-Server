import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn} from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";

@Entity("maintenance_order_route")
export class Route extends MaintenanceOrder {
  
}