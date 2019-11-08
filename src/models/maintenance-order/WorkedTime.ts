import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { MaintenanceWorker } from "./MaintenanceWorker";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { User } from "../User";

@Entity('maintenance_worker_time')
export class WorkedTime {

  @PrimaryGeneratedColumn("uuid")
  private id: any;

  @OneToOne(type => User, user => user.getId)
  private user: User;

  @OneToOne(type => MaintenanceOrder, maintenanceOrder => maintenanceOrder.getId)
  private maintenanceOrder: MaintenanceOrder;

  @ManyToOne(type => MaintenanceWorker, maintenanceWorker => maintenanceWorker.getWorkerdTime)
  private maintenanceWorker: MaintenanceWorker;

  @Column()
  private startedWork: Date;

  @Column()
  private finishedWork: Date;

  @Column({ type: "int" })
  private intervalTime: number;

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
   * Getter maintenanceWorker
   * @return {MaintenanceWorker}
   */
  public getMaintenanceWorker(): MaintenanceWorker {
    return this.maintenanceWorker;
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
   * Getter deleted
   * @return {boolean }
   */
  public getDeleted(): boolean {
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
   * Setter maintenanceWorker
   * @param {MaintenanceWorker} value
   */
  public setMaintenanceWorker(value: MaintenanceWorker) {
    this.maintenanceWorker = value;
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
   * Setter deleted
   * @param {boolean } value
   */
  public setDeleted(value: boolean) {
    this.deleted = value;
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
   * Getter intervalTime
   * @return {number}
   */
  public getIntervalTime(): number {
    return this.intervalTime;
  }

  /**
   * Setter intervalTime
   * @param {number} value
   */
  public setIntervalTime(value: number) {
    this.intervalTime = value;
  }

}