import { Entity, ManyToOne, JoinColumn, Column, OneToOne, OneToMany } from "typeorm";
import { CrudClass } from "../CrudClass";
import { OrderEquipment } from "./OrderEquipment";
import { DefaultObservation } from "../DefaultObservation";
import { OrderComponent } from "./OrderComponent";

@Entity("order_operation")
export abstract class OrderOperation extends CrudClass {

  @ManyToOne(type => OrderEquipment, orderEquipment => orderEquipment.getOrderOperation, { cascade: false })
  private orderEquipment: OrderEquipment;

  @OneToMany(type => OrderComponent, orderComponent => orderComponent.getMaintenanceOrder, { cascade: false, nullable: true })
  private orderComponent: Array<OrderComponent>;

  @Column()
  private operationNumber: string;

  @Column({ type: "int" })
  private planningTime: number;

  @Column({ type: "int" })
  private executeTime: number;

  @Column()
  private executed: boolean;

  @Column({
    type: 'varchar',
    length: '255'
  })
  private note: string;

  @ManyToOne(type => DefaultObservation, defaultObservation => defaultObservation.getId, { nullable: true })
  private defaultObservation: DefaultObservation | null = null

  constructor() {
    super();
  }

  /**
   * Getter orderEquipment
   * @return {OrderEquipment}
   */
  public getOrderEquipment(): OrderEquipment {
    return this.orderEquipment;
  }

  /**
   * Getter operationNumber
   * @return {string}
   */
  public getOperationNumber(): string {
    return this.operationNumber;
  }

  /**
   * Getter planningTime
   * @return {number}
   */
  public getPlanningTime(): number {
    return this.planningTime;
  }

  /**
   * Getter executeTime
   * @return {number}
   */
  public getExecuteTime(): number {
    return this.executeTime;
  }

  /**
   * Getter executed
   * @return {boolean}
   */
  public getExecuted(): boolean {
    return this.executed;
  }

  /**
   * Getter note
   * @return {string}
   */
  public getNote(): string {
    return this.note;
  }

  /**
   * Setter orderEquipment
   * @param {OrderEquipment} value
   */
  public setOrderEquipment(value: OrderEquipment) {
    this.orderEquipment = value;
  }

  /**
   * Setter operationNumber
   * @param {string} value
   */
  public setOperationNumber(value: string) {
    this.operationNumber = value;
  }

  /**
   * Setter planningTime
   * @param {number} value
   */
  public setPlanningTime(value: number) {
    this.planningTime = value;
  }

  /**
   * Setter executeTime
   * @param {number} value
   */
  public setExecuteTime(value: number) {
    this.executeTime = value;
  }

  /**
   * Setter executed
   * @param {boolean} value
   */
  public setExecuted(value: boolean) {
    this.executed = value;
  }

  /**
   * Setter note
   * @param {string} value
   */
  public setNote(value: string) {
    this.note = value;
  }

  /**
   * Getter defaultObservation
   * @return {DefaultObservation }
   */
  public getDefaultObservation(): DefaultObservation {
    return this.defaultObservation;
  }

  /**
   * Setter defaultObservation
   * @param {DefaultObservation } value
   */
  public setDefaultObservation(value: DefaultObservation) {
    this.defaultObservation = value;
  }

  /**
   * Getter orderComponent
   * @return {Array<OrderComponent>}
   */
  public getOrderComponent(): Array<OrderComponent> {
    return this.orderComponent;
  }

  /**
   * Setter orderComponent
   * @param {Array<OrderComponent>} value
   */
  public setOrderComponent(value: Array<OrderComponent>) {
    this.orderComponent = value;
  }

}