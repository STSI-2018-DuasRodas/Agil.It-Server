import { Column } from "typeorm";
import { BaseClass } from "../BaseClass";

export abstract class MaintenanceOrder extends BaseClass {

  @Column()
  private orderNumber: string = '';

  constructor() {
    super();
  }

  /**
   * Getter orderNumber
   * @return {string }
   */
  public getOrderNumber(): string  {
    return this.orderNumber;
  }

  /**
   * Setter orderNumber
   * @param {string } value
   */
  public setOrderNumber(value: string ) {
    this.orderNumber = value;
  }
}