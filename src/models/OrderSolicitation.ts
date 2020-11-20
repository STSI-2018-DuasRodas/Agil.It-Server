import { Entity } from "typeorm";
import { CrudClass } from "./CrudClass";

@Entity("order_solicitation")
export class Sector extends CrudClass {
  
  constructor(){
    super();
  }

  @Column({nullable: false})
  @IsNotEmpty({
    message:'Usuário Solicitante: Campo obrigatório.'
  })
  public solicitationUser: User = '';

}