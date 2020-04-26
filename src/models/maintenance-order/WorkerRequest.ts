import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../User";
import { MaintenanceWorker } from "./MaintenanceWorker";
import { WorkerRequestStatus } from "../enum/WorkerRequestStatus";
import { RequestType } from "../enum/RequestType";

@Entity('worker_request')
export class WorkerRequest {

  @PrimaryGeneratedColumn("uuid")
  public id: any;

  @ManyToOne(type => MaintenanceWorker, maintenanceWorker => maintenanceWorker.id)
  @JoinColumn()
  public maintenanceWorker: MaintenanceWorker;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn()
  public requestedBy: User;

  @Column({
    type: "enum",
    enum: WorkerRequestStatus,
    default: WorkerRequestStatus.REQUESTED
  })
  public status: WorkerRequestStatus;

  @Column({
    type: "enum",
    enum: RequestType
  })
  public type: RequestType;

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