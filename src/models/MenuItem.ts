import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import { UserRole } from "./enum/UserRole";

@Entity("menu_item")
export class MenuItem {

  @PrimaryGeneratedColumn()
  public id : number|undefined;

  @Column()
  public title : string = '';

  @Column()
  public tooltip : string = '';

  @Column()
  public icon : string = '';

  @Column("simple-array")
  public access : Array<UserRole> = [];

  @Column()
  public actionWeb : string = '';

  @Column()
  public actionMobile : string = '';

  @Column({
    type: Boolean,
    default: false
  })
  public deleted : boolean = false

  constructor() {
  }
  
}