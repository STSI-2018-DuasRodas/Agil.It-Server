import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, ManyToOne } from "typeorm";

import { UserRole } from '../enum/UserRole';
import { Sector } from './Sector';

@Entity("user")
export class User {

  @PrimaryGeneratedColumn()
  private id: number | undefined;

  @Column()
  private name: string = '';

  @Column()
  private email: string = '';

  @Column()
  private password: string = '';

  @Column({
    type: "enum",
    enum: UserRole
  })
  private role: UserRole | undefined;

  @Column()
  private contact: string = '';

  @Column("date")
  private birthDate: Date | undefined;

  @Column()
  private integrationID: string = '';

  @Column()
  private forceChangePassword: boolean = false;
  
  @OneToOne(
    type => Sector,
    sector => sector.getId,
    { nullable: true },
  )
  @JoinColumn()
  private sector: Sector | null = null;


  @CreateDateColumn()
  private createdAt: Date | undefined;

  
  @OneToOne(
    (type) => User,
    (user) => user.getId,
    { nullable: true },
  )
  @JoinColumn()
  private createdBy: User | undefined

  @UpdateDateColumn()
  private updatedAt   : Date | undefined;

  @OneToOne(
    (type) => User,
    (user) => user.getId,
    { nullable: true },
  )
  @JoinColumn()
  private updatedBy: User | undefined

  @Column({
    type: Boolean,
    default: false
  })
  private deleted : boolean = false

  constructor() {

  }

  public setId(id: number): void {
    this.id = id;
  }

  public getId(): number | undefined {
    return this.id;
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

  public setIntegrationID(integrationID: string): void {
    this.integrationID = integrationID;
  }

  public getIntegrationID(): string {
    return this.integrationID;
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

  public getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  public getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  public getCreatedBy(): User | undefined {
    return this.createdBy;
  }

  public getUpdatedBy(): User | undefined {
    return this.updatedBy;
  }

  /**
   * Getter deleted
   * @return {boolean }
   */
	public getDeleted(): boolean  {
		return this.deleted;
	}

  /**
   * Setter deleted
   * @param {boolean } value
   */
	public setDeleted(value: boolean ) {
		this.deleted = value;
	}

}