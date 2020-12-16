import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../User";
import { MaintenanceWorker } from "./MaintenanceWorker";
import { WorkerRequestStatus } from "../enum/WorkerRequestStatus";
import { RequestType } from "../enum/RequestType";

@Entity('worker_request')
export class WorkerRequest {

  @PrimaryGeneratedColumn("uuid")
  public id: any = undefined;

  @ManyToOne(type => MaintenanceWorker, maintenanceWorker => maintenanceWorker.id)
  @JoinColumn()
  public maintenanceWorker: MaintenanceWorker = undefined;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn()
  public requestedBy: User = undefined;

  @Column({
    type: "simple-enum",
    enum: WorkerRequestStatus,
    default: WorkerRequestStatus.REQUESTED
  })
  public status: WorkerRequestStatus = undefined;

  @Column({
    type: "simple-enum",
    enum: RequestType
  })
  public type: RequestType = undefined;

  @CreateDateColumn()
  public createdAt: Date | undefined = undefined;

  @Column()
  public createdBy: number | undefined = undefined;

  @UpdateDateColumn()
  public updatedAt: Date | undefined = undefined;

  @Column()
  public updatedBy: number | undefined = undefined;

  @Column({
    type: Boolean,
    default: false
  })
  public deleted: boolean = false;

}