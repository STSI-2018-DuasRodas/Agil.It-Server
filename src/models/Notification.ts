import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { NotificationStatus } from "./enum/NotificationStatus";
import { User } from "./User";

@Entity("notification")
export class Notification {
  
  @PrimaryGeneratedColumn("uuid")
  public id: any = undefined;

  @Column()
  public title: string = undefined;

  @Column()
  public description: string = undefined;

  @Column()
  public icon: string = undefined;

  @Column()
  artefact: string = undefined;
  
  @Column()
  artefactId: string = undefined;

  @Column({
    type: "simple-enum",
    enum: NotificationStatus,
    default: NotificationStatus.NEW
  })
  public status: NotificationStatus = NotificationStatus.NEW;

  @ManyToOne(type => User, user => user.id)
  public user: User = undefined;

  @CreateDateColumn()
  public createdAt: Date | undefined = undefined;

  @UpdateDateColumn()
  public updatedAt: Date | undefined = undefined;

  @Column({
    type: Boolean,
    default: false
  })
  public deleted: boolean = false;
}