import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { NotificatoinStatus } from "./enum/NotificatoinStatus";
import { User } from "./User";

@Entity("notification")
export class Notification {
  
  @PrimaryGeneratedColumn("uuid")
  public id: any;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public icon: string;

  @Column()
  artefact: string;
  
  @Column()
  artefactId: string;

  @Column({
    type: "enum",
    enum: NotificatoinStatus,
    default: NotificatoinStatus.NEW
  })
  public status: NotificatoinStatus;

  @ManyToOne(type => User, user => user.id)
  public user: User;

  @CreateDateColumn()
  public createdAt: Date | undefined;

  @UpdateDateColumn()
  public updatedAt: Date | undefined;
  
}