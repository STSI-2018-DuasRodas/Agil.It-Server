import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Column, JoinColumn } from "typeorm";
import { MaintenanceWorker } from "./MaintenanceWorker";

@Entity('maintenance_worker_time')
export class WorkedTime {

  @PrimaryGeneratedColumn("uuid")
  public id: any;

  @ManyToOne(type => MaintenanceWorker, maintenanceWorker => maintenanceWorker.id)
  @JoinColumn()
  public maintenanceWorker: MaintenanceWorker;

  @Column()
  public startedWork: Date;

  @Column()
  public finishedWork: Date;

  @Column({ type: "int" })
  public intervalTime: number;

  @CreateDateColumn()
  public createdAt: Date | undefined;

  @Column()
  public createdBy: number | undefined;

  @UpdateDateColumn()
  public updatedAt: Date | undefined;

  @Column()
  public updatedBy: number | undefined;

  @Column({
    type: Boolean,
    default: false
  })
  public deleted: boolean = false;

}