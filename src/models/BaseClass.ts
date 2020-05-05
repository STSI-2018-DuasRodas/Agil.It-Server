import { CreateDateColumn, UpdateDateColumn, Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseClass {

  @PrimaryGeneratedColumn()
  public id: number | undefined = undefined;

  @Column({default: ''})
  public integrationID: string = '';

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

  constructor() {
  }

}