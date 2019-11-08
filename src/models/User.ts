import { Entity, Column, OneToOne, JoinColumn, Unique } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { UserRole } from './enum/UserRole';
import { Sector } from './Sector';
import { BaseClass } from "./BaseClass";
import { WorkCenter } from "./WorkCenter";

@Entity("user")
@Unique(["email","employeeBadge"])
export class User extends BaseClass {

  @Column()
  @IsNotEmpty()
  private name: string = '';

  @Column()
  @IsNotEmpty()
  private email: string = '';

  @Column()
  @Length(4, 100)
  private password: string = '';

  @Column({
    type: "enum",
    enum: UserRole
  })
  @IsNotEmpty()
  private role: UserRole | undefined;

  @Column()
  @IsNotEmpty()
  private contact: string = '';

  @Column("date")
  @IsNotEmpty()
  private birthDate: Date | undefined;

  @Column()
  private forceChangePassword: boolean = false;
  
  @OneToOne(
    type => Sector,
    sector => sector.getId,
    { nullable: true },
  )
  @JoinColumn()
  private sector: Sector | null = null;

  @OneToOne(
    type => WorkCenter,
    workCenter => workCenter.getId,
    { nullable: true },
  )
  @JoinColumn()
  private workCenter: WorkCenter | null = null;

  @Column()
  @IsNotEmpty()
  private employeeBadge: string = ''

  constructor() {
    super();
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getEmail(): string {
    return this.email;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public getPassword(): string {
    return this.password;
  }

  public setRole(role: UserRole): void {
    this.role = role;
  }

  public getRole(): UserRole | undefined {
    return this.role;
  }

  public setContact(contact: string): void {
    this.contact = contact;
  }

  public getContact(): string {
    return this.contact;
  }

  public setBirthDate(birthDate: Date): void {
    this.birthDate = birthDate;
  }

  public getBirthDate(): Date | undefined {
    return this.birthDate;
  }

  public setForceChangePassword(forceChangePassword: boolean): void {
    this.forceChangePassword = forceChangePassword;
  }

  public getForceChangePassword(): boolean {
    return this.forceChangePassword;
  }

  public setSector(sector: Sector): void {
    this.sector = sector;
  }

  public getSector(): Sector | null {
    return this.sector;
  }

	public setEmployeeBadge(value: string ) {
		this.employeeBadge = value;
	}

	public getEmployeeBadge(): string  {
		return this.employeeBadge;
	}

	public getWorkCenter(): WorkCenter  {
		return this.workCenter;
	}

	public setWorkCenter(value: WorkCenter ) {
		this.workCenter = value;
	}

}