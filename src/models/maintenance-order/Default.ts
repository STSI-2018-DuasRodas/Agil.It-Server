import { ChildEntity, OneToMany, Column, ManyToOne, JoinColumn } from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";

@ChildEntity()
export class Default extends MaintenanceOrder {

  constructor() {
    super();
  }

}