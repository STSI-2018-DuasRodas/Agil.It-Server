import { getRepository } from "typeorm";
import { DefaultOperation } from "../models/DefaultOperation";
import { CrudController } from "./CrudController";

export class DefaultOperationController extends CrudController<DefaultOperation> {

  constructor() {
    super(getRepository(DefaultOperation))
  } 

}