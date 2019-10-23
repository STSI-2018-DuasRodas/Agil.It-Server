import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn} from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";

@Entity("maintenance_order_list")
export class List extends MaintenanceOrder {
  @Column()
  private name:string = '';
}