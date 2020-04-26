import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../User";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { WorkerRequest } from "./WorkerRequest";
import { WorkedTime } from "./WorkedTime";
import { BaseClass } from "../BaseClass";

@Entity('maintenance_worker')
export class MaintenanceWorker extends BaseClass {

  @ManyToOne(type => User, user => user.getId)
  @JoinColumn()
  private user : User;
  
  @ManyToOne(type => MaintenanceOrder, maintenanceOrder => maintenanceOrder.getId, {cascade: false})
  @JoinColumn()
  private maintenanceOrder : MaintenanceOrder;
  
  @Column()
  private isMain: boolean = false;

  @Column()
  private isActive: boolean = false;
  
  @OneToMany(type => WorkerRequest, workerRequest => workerRequest.getMaintenanceWorker, {cascade: false})
  private workerRequest: Array<WorkerRequest>;

  @OneToMany(type => WorkedTime, workedTime => workedTime.getMaintenanceWorker, {cascade: false})
  private workedTime: Array<WorkedTime>;

  /**
   * Getter user
   * @return {User}
   */
	public getUser(): User {
		return this.user;
	}

  /**
   * Getter maintenanceOrder
   * @return {MaintenanceOrder}
   */
	public getMaintenanceOrder(): MaintenanceOrder {
		return this.maintenanceOrder;
	}

  /**
   * Getter isMain
   * @return {boolean }
   */
	public getIsMain(): boolean  {
		return this.isMain;
	}

  /**
   * Getter isActive
   * @return {boolean }
   */
	public getIsActive(): boolean  {
		return this.isActive;
  }
  
  /**
   * Getter workerRequest
   * @return {Array<WorkerRequest>}
   */
	public getWorkerRequest(): Array<WorkerRequest> {
		return this.workerRequest;
  }
  
  /**
   * Setter user
   * @param {User} value
   */
	public setUser(value: User) {
		this.user = value;
	}

  /**
   * Setter maintenanceOrder
   * @param {MaintenanceOrder} value
   */
	public setMaintenanceOrder(value: MaintenanceOrder) {
		this.maintenanceOrder = value;
	}

  /**
   * Setter isMain
   * @param {boolean } value
   */
	public setIsMain(value: boolean ) {
		this.isMain = value;
	}

  /**
   * Setter isActive
   * @param {boolean } value
   */
	public setIsActive(value: boolean ) {
		this.isActive = value;
  }
  
  /**
   * Setter workerRequest
   * @param {Array<WorkerRequest>} value
   */
	public setWorkerRequest(value: Array<WorkerRequest>) {
		this.workerRequest = value;
	}

  /**
   * Getter workedTime
   * @return {Array<WorkedTime>}
   */
	public getWorkedTime(): Array<WorkedTime> {
		return this.workedTime;
	}

  /**
   * Setter workedTime
   * @param {Array<WorkedTime>} value
   */
	public setWorkedTime(value: Array<WorkedTime>) {
		this.workedTime = value;
	}
  
}