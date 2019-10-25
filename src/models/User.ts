import { Entity, Column, OneToOne, JoinColumn } from "typeorm";

import { UserRole } from './enum/UserRole';
import { Sector } from './Sector';
import { BaseClass } from "./BaseClass";

@Entity("user")
export class User extends BaseClass {

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
  private forceChangePassword: boolean = false;
  
  @OneToOne(
    type => Sector,
    sector => sector.getId,
    { nullable: true },
  )
  @JoinColumn()
  private sector: Sector | null = null;

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

}