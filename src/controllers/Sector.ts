import { getRepository } from "typeorm";
import { Sector } from "../models/Sector";
import { CrudController } from "./CrudController";

export class SectorController extends CrudController<Sector> {

  constructor() {
    super(getRepository(Sector))
  } 

}