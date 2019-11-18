import { BaseClass } from "./BaseClass";
import { Column } from "typeorm";
import { IsNotEmpty } from "class-validator";

export abstract class CrudClass extends BaseClass {

  @Column({nullable: false})
  @IsNotEmpty({
    message:'Descrição: Campo obrigatório.'
  })
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