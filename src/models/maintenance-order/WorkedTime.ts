import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Column, JoinColumn } from "typeorm";
import { MaintenanceWorker } from "./MaintenanceWorker";

@Entity('maintenance_worker_time')
export class WorkedTime {

  @PrimaryGeneratedColumn("uuid")
  private id: any;

  @ManyToOne(type => MaintenanceWorker, maintenanceWorker => maintenanceWorker.getId)
  @JoinColumn()
  private maintenanceWorker: MaintenanceWorker;

  @Column()
  private startedWork: Date;

  @Column()
  private finishedWork: Date;

  @Column({ type: "int" })
  private intervalTime: number;

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
     * Getter maintenanceWorker
     * @return {MaintenanceWorker}
     */
	public getMaintenanceWorker(): MaintenanceWorker {
		return this.maintenanceWorker;
	}

  /**
   * Getter startedWork
   * @return {Date}
   */
	public getStartedWork(): Date {
		return this.startedWork;
	}

  /**
   * Getter finishedWork
   * @return {Date}
   */
	public getFinishedWork(): Date {
		return this.finishedWork;
	}

  /**
   * Getter intervalTime
   * @return {number}
   */
	public getIntervalTime(): number {
		return this.intervalTime;
	}

  /**
   * Getter createdAt
   * @return {Date }
   */
	public getCreatedAt(): Date  {
		return this.createdAt;
	}

  /**
   * Getter createdBy
   * @return {number }
   */
	public getCreatedBy(): number  {
		return this.createdBy;
	}

  /**
   * Getter updatedAt
   * @return {Date }
   */
	public getUpdatedAt(): Date  {
		return this.updatedAt;
	}

  /**
   * Getter updatedBy
   * @return {number }
   */
	public getUpdatedBy(): number  {
		return this.updatedBy;
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
   * Setter maintenanceWorker
   * @param {MaintenanceWorker} value
   */
	public setMaintenanceWorker(value: MaintenanceWorker) {
		this.maintenanceWorker = value;
	}

  /**
   * Setter startedWork
   * @param {Date} value
   */
	public setStartedWork(value: Date) {
		this.startedWork = value;
	}

  /**
   * Setter finishedWork
   * @param {Date} value
   */
	public setFinishedWork(value: Date) {
		this.finishedWork = value;
	}

  /**
   * Setter intervalTime
   * @param {number} value
   */
	public setIntervalTime(value: number) {
		this.intervalTime = value;
	}

  /**
   * Setter createdAt
   * @param {Date } value
   */
	public setCreatedAt(value: Date ) {
		this.createdAt = value;
	}

  /**
   * Setter createdBy
   * @param {number } value
   */
	public setCreatedBy(value: number ) {
		this.createdBy = value;
	}

  /**
   * Setter updatedAt
   * @param {Date } value
   */
	public setUpdatedAt(value: Date ) {
		this.updatedAt = value;
	}

  /**
   * Setter updatedBy
   * @param {number } value
   */
	public setUpdatedBy(value: number ) {
		this.updatedBy = value;
	}

  /**
   * Setter deleted
   * @param {boolean } value
   */
	public setDeleted(value: boolean ) {
		this.deleted = value;
	}

}