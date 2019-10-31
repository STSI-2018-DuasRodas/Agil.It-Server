import {getRepository} from "typeorm";
import {MenuItem} from "../models/MenuItem";
import {CrudController} from "./CrudController";

export class MenuItemController extends CrudController<MenuItem> {

  constructor() {
    super(getRepository(MenuItem))
  } 

}