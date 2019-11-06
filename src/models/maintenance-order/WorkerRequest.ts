import { Entity, Column, OneToOne, PrimaryColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../User";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { WorderRequestStatus } from "../enum/WorkerRequestStatus";

@Entity('worker_request')
export class WorkerRequest {
  
  @PrimaryGeneratedColumn("uuid")
  private id: any;

  @OneToOne(type => User, user => user.getId)
  private user : User;
  
  @OneToOne(type => MaintenanceOrder, maintenanceOrder => maintenanceOrder.getId)
  private maintenanceOrder : MaintenanceOrder;
  
  @Column()
  private request: boolean = false;
  
  @OneToOne(type => User, user => user.getId)
  private requestedBy: User;

  @Column({
    type: "enum",
    enum: WorderRequestStatus,
    default: WorderRequestStatus.REQUESTED
  })
  private status : WorderRequestStatus;

  @CreateDateColumn()
  private createdAt: Date | undefined;
  
  @UpdateDateColumn()
  private updatedAt: Date | undefined;
  
  @Column({
    type: Boolean,
    default: false
  })
  private deleted: boolean = false;

  /**
   * Getter id
   * @return {any}
   */
	public getId(): any {
		return this.id;
	}

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
   * Getter request
   * @return {boolean }
   */
	public getRequest(): boolean  {
		return this.request;
	}

  /**
   * Getter requestedBy
   * @return {User}
   */
	public getRequestedBy(): User {
		return this.requestedBy;
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
   * Getter status
   * @return {WorderRequestStatus}
   */
	public getStatus(): WorderRequestStatus {
		return this.status;
	}

  /**
   * Getter deleted
   * @return {boolean }
   */
	public getDeleted(): boolean  {
		return this.deleted;
	}

  /**
   * Setter id
   * @param {any} value
   */
	public setId(value: any) {
		this.id = value;
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
   * Setter request
   * @param {boolean } value
   */
	public setRequest(value: boolean ) {
		this.request = value;
	}

  /**
   * Setter requestedBy
   * @param {User} value
   */
	public setRequestedBy(value: User) {
		this.requestedBy = value;
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
   * Setter status
   * @param {WorderRequestStatus} value
   */
	public setStatus(value: WorderRequestStatus) {
		this.status = value;
	}

  /**
   * Setter deleted
   * @param {boolean } value
   */
	public setDeleted(value: boolean ) {
		this.deleted = value;
	}

}