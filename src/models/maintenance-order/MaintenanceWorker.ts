import { Entity, PrimaryColumn, OneToOne, Column, UpdateDateColumn, CreateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../User";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { WorkerRequest } from "./WorkerRequest";
import { WorkedTime } from "./WorkedTime";

@Entity('maintenance_worker')
export class MaintenanceWorker {

  @PrimaryColumn()
  private userId : number;

  @PrimaryColumn()
  private maintenanceOrderId : number;

  @ManyToOne(type => User, user => user.getId)
  @JoinColumn({ name: "userId" })
  private user : User;
  
  @ManyToOne(type => MaintenanceOrder, maintenanceOrder => maintenanceOrder.getMaintenanceWorker, {cascade: false})
  @JoinColumn({ name: "maintenanceOrderId" })
  private maintenanceOrder : MaintenanceOrder;
  
  @Column()
  private isMain: boolean = false;

  @Column()
  private isActive: boolean = false;
  
  @CreateDateColumn()
  private createdAt: Date | undefined;
  
  @UpdateDateColumn()
  private updatedAt: Date | undefined;
  
  @OneToMany(type => WorkerRequest, workerRequest => workerRequest.getId, {cascade: false})
  private workerRequest: Array<WorkerRequest>;

  @OneToMany(type => WorkedTime, workedTime => workedTime.getId, {cascade: false})
  private workedTime: Array<WorkedTime>;

  @Column({
    type: Boolean,
    default: false
  })
  private deleted: boolean = false;

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
   * Getter createdAt
   * @return {Date }
   */
	public getCreatedAt(): Date  {
		return this.createdAt;
	}

  /**
   * Getter updatedAt
   * @return {Date }
   */
	public getUpdatedAt(): Date  {
		return this.updatedAt;
	}

  /**
   * Getter workerRequest
   * @return {Array<WorkerRequest>}
   */
	public getWorkerRequest(): Array<WorkerRequest> {
		return this.workerRequest;
  }
  
  /**
   * Getter deleted
   * @return {boolean }
   */
	public getDeleted(): boolean  {
		return this.deleted;
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
   * Setter createdAt
   * @param {Date } value
   */
	public setCreatedAt(value: Date ) {
		this.createdAt = value;
	}

  /**
   * Setter updatedAt
   * @param {Date } value
   */
	public setUpdatedAt(value: Date ) {
		this.updatedAt = value;
	}

  /**
   * Setter workerRequest
   * @param {Array<WorkerRequest>} value
   */
	public setWorkerRequest(value: Array<WorkerRequest>) {
		this.workerRequest = value;
	}

  /**
   * Setter deleted
   * @param {boolean } value
   */
	public setDeleted(value: boolean ) {
		this.deleted = value;
  }

  /**
   * Getter userId
   * @return {number}
   */
	public getUserId(): number {
		return this.userId;
	}

  /**
   * Setter userId
   * @param {number} value
   */
	public setUserId(value: number) {
		this.userId = value;
	}

  /**
   * Getter maintenanceOrderId
   * @return {number}
   */
	public getMaintenanceOrderId(): number {
		return this.maintenanceOrderId;
	}

  /**
   * Setter maintenanceOrderId
   * @param {number} value
   */
	public setMaintenanceOrderId(value: number) {
		this.maintenanceOrderId = value;
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