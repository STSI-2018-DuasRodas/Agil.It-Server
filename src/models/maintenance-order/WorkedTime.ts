import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Column, JoinColumn } from "typeorm";
import { MaintenanceWorker } from "./MaintenanceWorker";
import { IsNotEmpty } from "class-validator";

@Entity('maintenance_worker_time')
export class WorkedTime {

  @PrimaryGeneratedColumn("uuid")
  public id: any = undefined;

  @Column({nullable: false})
  @IsNotEmpty({
    message:'Descrição: Campo obrigatório.'
  })
  public description: string = '';
  
  @ManyToOne(type => MaintenanceWorker, maintenanceWorker => maintenanceWorker.id)
  @JoinColumn()
  public maintenanceWorker: MaintenanceWorker = undefined;

  @Column()
  public startedWork: Date = undefined;

  @Column()
  public finishedWork: Date = undefined;

  @Column({ type: "int" })
  public intervalTime: number = undefined;

  @CreateDateColumn()
  public createdAt: Date | undefined = undefined;

  @Column()
  public createdBy: number | undefined = undefined;

  @UpdateDateColumn()
  public updatedAt: Date | undefined = undefined;

  @Column()
  public updatedBy: number | undefined = undefined;

  @Column({
    type: Boolean,
    default: false
  })
  public deleted: boolean = false;

}