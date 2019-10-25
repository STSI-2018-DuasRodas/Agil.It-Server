import { BaseClass } from "./BaseClass";
import { Column } from "typeorm";

export abstract class CrudClass extends BaseClass {

  @Column()
  private description: string = '';

  constructor() {
    super();
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getDescription(): string {
    return this.description;
  }

}