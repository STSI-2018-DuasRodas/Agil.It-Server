import { getRepository } from "typeorm";
import { DefaultObservation } from "../models/DefaultObservation";
import { CrudController } from "./CrudController";

export class DefaultObservationController extends CrudController<DefaultObservation> {

  constructor() {
    super(getRepository(DefaultObservation))
  } 

}