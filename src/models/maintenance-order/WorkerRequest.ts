import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../User";
import { MaintenanceWorker } from "./MaintenanceWorker";
import { WorkerRequestStatus } from "../enum/WorkerRequestStatus";
import { RequestType } from "../enum/RequestType";

@Entity('worker_request')
export class WorkerRequest {

  @PrimaryGeneratedColumn("uuid")
  private id: any;

  @ManyToOne(type => MaintenanceWorker, maintenanceWorker => maintenanceWorker.getId)
  @JoinColumn()
  private maintenanceWorker: MaintenanceWorker;

  @ManyToOne(type => User, user => user.getId)
  @JoinColumn()
  private requestedBy: User;

  @Column({
    type: "enum",
    enum: WorkerRequestStatus,
    default: WorkerRequestStatus.REQUESTED
  })
  private status: WorkerRequestStatus;

  @Column({
    type: "enum",
    enum: RequestType
  })
  private type: RequestType;

  @CreateDateColumn()
  private createdAt: Date | undefined;

  @Column()
  private createdBy: number | undefined;

  @UpdateDateColumn()
  private updatedAt: Date | undefined;

  @Column()
  private updatedBy: number | undefined;

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
  public getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * Getter updatedAt
   * @return {Date }
   */
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  /**
   * Getter status
   * @return {WorkerRequestStatus}
   */
  public getStatus(): WorkerRequestStatus {
    return this.status;
  }
  
  /**
   * Getter type
   * @return {WorkerRequestStatus}
   */
  public getType(): RequestType {
    return this.type;
  }

  /**
   * Getter deleted
   * @return {boolean }
   */
  public getDeleted(): boolean {
    return this.deleted;
  }

  /**
   * Getter createdBy
   * @return {number }
   */
	public getCreatedBy(): number  {
		return this.createdBy;
	}

  /**
   * Getter updatedBy
   * @return {number }
   */
	public getUpdatedBy(): number  {
		return this.updatedBy;
	}

  /**
   * Setter id
   * @param {any} value
   */
  public setId(value: any) {
    this.id = value;
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
  public setCreatedAt(value: Date) {
    this.createdAt = value;
  }

  /**
   * Setter updatedAt
   * @param {Date } value
   */
  public setUpdatedAt(value: Date) {
    this.updatedAt = value;
  }

  /**
   * Setter type
   * @param {RequestType} value
   */
  public setType(value: RequestType) {
    this.type = value;
  }

  /**
   * Setter status
   * @param {WorkerRequestStatus} value
   */
  public setStatus(value: WorkerRequestStatus) {
    this.status = value;
  }

  /**
   * Setter deleted
   * @param {boolean } value
   */
  public setDeleted(value: boolean) {
    this.deleted = value;
  }

  /**
   * Getter maintenanceWorker
   * @return {MaintenanceWorker}
   */
  public getMaintenanceWorker(): MaintenanceWorker {
    return this.maintenanceWorker;
  }

  /**
   * Setter maintenanceWorker
   * @param {MaintenanceWorker} value
   */
  public setMaintenanceWorker(value: MaintenanceWorker) {
    this.maintenanceWorker = value;
  }

  /**
   * Setter createdBy
   * @param {number } value
   */
	public setCreatedBy(value: number ) {
		this.createdBy = value;
	}

  /**
   * Setter updatedBy
   * @param {number } value
   */
	public setUpdatedBy(value: number ) {
		this.updatedBy = value;
	}

}