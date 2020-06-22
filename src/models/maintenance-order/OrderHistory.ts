import { PrimaryGeneratedColumn, Entity, CreateDateColumn, Column } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity('maintenance_order_history')
export class OrderHistory {

  @PrimaryGeneratedColumn('uuid')
  public id: string | undefined = undefined;

  @Column({nullable: false})
  @IsNotEmpty({
    message:'Descrição do Histórico: Campo obrigatório.'
  })
  public description: string = '';
  
  @CreateDateColumn()
  public createdAt: Date | undefined = undefined;

  @Column()
  public createdBy: number | undefined = undefined;

  constructor() {
  }
}