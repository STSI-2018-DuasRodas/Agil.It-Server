import { CreateDateColumn, UpdateDateColumn, Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseClass {

  @PrimaryGeneratedColumn()
  public id: number | undefined;

  @Column({default: ''})
  public integrationID: string = '';

  @CreateDateColumn()
  public createdAt: Date | undefined;

  @Column()
  public createdBy: number | undefined;

  @UpdateDateColumn()
  public updatedAt: Date | undefined;

  @Column()
  public updatedBy: number | undefined;

  @Column({
    type: Boolean,
    default: false
  })
  public deleted: boolean = false;

  constructor() {
  }

}