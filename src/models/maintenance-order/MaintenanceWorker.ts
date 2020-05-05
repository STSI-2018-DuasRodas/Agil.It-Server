import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../User";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { WorkerRequest } from "./WorkerRequest";
import { WorkedTime } from "./WorkedTime";
import { BaseClass } from "../BaseClass";

@Entity('maintenance_worker')
export class MaintenanceWorker extends BaseClass {

  @ManyToOne(type => User, user => user.id)
  @JoinColumn()
  public user : User;
  
  @ManyToOne(type => MaintenanceOrder, maintenanceOrder => maintenanceOrder.id, {cascade: false})
  @JoinColumn()
  public maintenanceOrder : MaintenanceOrder | undefined = undefined;
  
  @Column()
  public isMain: boolean = false;

  @Column()
  public isActive: boolean = false;
  
  @OneToMany(type => WorkerRequest, workerRequest => workerRequest.maintenanceWorker, {cascade: false})
  public workerRequest: Array<WorkerRequest>;

  @OneToMany(type => WorkedTime, workedTime => workedTime.maintenanceWorker, {cascade: false})
  public workedTime: Array<WorkedTime>;
 
}