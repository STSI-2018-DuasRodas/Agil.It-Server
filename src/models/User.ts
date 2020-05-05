import { Entity, Column, OneToOne, JoinColumn, Unique } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { UserRole } from './enum/UserRole';
import { Sector } from './Sector';
import { BaseClass } from "./BaseClass";
import { WorkCenter } from "./WorkCenter";
import { Gender } from "./enum/Gender";

@Entity("user")
@Unique(["email", "employeeBadge"])
export class User extends BaseClass {

  @Column()
  @IsNotEmpty()
  public name: string = '';

  @Column()
  @IsNotEmpty()
  public email: string = '';

  @Column(/*{select: false}*/)
  @Length(4, 100)
  public password: string = '';

  @Column({
    type: "enum",
    enum: UserRole
  })
  @IsNotEmpty()
  public role: UserRole | undefined = undefined;

  @Column()
  @IsNotEmpty()
  public contact: string = '';

  @Column("date")
  @IsNotEmpty()
  public birthDate: Date | undefined = undefined;

  @Column()
  public forceChangePassword: boolean = false;

  @OneToOne(
    type => Sector,
    sector => sector.id,
    { nullable: true },
  )
  @JoinColumn()
  public sector: Sector | null = null;

  @OneToOne(
    type => WorkCenter,
    workCenter => workCenter.id,
    { nullable: true },
  )
  @JoinColumn()
  public workCenter: WorkCenter | null = null;

  @Column()
  @IsNotEmpty()
  public employeeBadge: string = ''

  @Column({
    type: "enum",
    enum: Gender
  })
  @IsNotEmpty()
  public gender: Gender = undefined;

  constructor() {
    super();
  }

}