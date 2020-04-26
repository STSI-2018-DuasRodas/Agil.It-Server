import { BaseClass } from "./BaseClass";
import { Column } from "typeorm";
import { IsNotEmpty } from "class-validator";

export abstract class CrudClass extends BaseClass {

  @Column({nullable: false})
  @IsNotEmpty({
    message:'Descrição: Campo obrigatório.'
  })
  public description: string = '';

  constructor() {
    super();
  }

}