import { Entity, PrimaryColumn, OneToOne, Column, UpdateDateColumn, CreateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../User";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { WorkerRequest } from "./WorkerRequest";

@Entity('maintenance_worker')
export class MaintenanceWorker {

  @PrimaryColumn()
  private userId : number;

  @PrimaryColumn()
  private maintenanceOrderId : number;

  @OneToOne(type => User, user => user.getId)
  private user : User;
  
  @OneToOne(type => MaintenanceOrder, maintenanceOrder => maintenanceOrder.getMaintenanceWorker, {cascade: false})
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
  @JoinColumn([
    {name: "userId", referencedColumnName: "userId"},
    {name: "maintenanceOrderId", referencedColumnName: "maintenanceOrderId"}
  ])
  private workerRequest: Array<WorkerRequest>;

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
  

}