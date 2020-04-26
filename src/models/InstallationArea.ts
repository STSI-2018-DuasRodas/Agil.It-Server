import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Sector } from "./Sector";
import { CrudClass } from "./CrudClass";

@Entity("installation_area")
export class InstallationArea extends CrudClass {

  @ManyToOne(
    (type) => Sector,
    (sector) => sector.id,
    { nullable: false },
  )
  @JoinColumn()
  public sector: Sector;

  constructor() {
    super();
  }
  
}