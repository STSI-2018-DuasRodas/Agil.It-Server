import { getRepository } from "typeorm";
import { Item } from "../models/Item";
import { CrudController } from "./CrudController";

export class ItemController extends CrudController<Item> {

  constructor() {
    super(getRepository(Item))
  } 

  public includes() {
    return ["measurementUnit"]
  }
}