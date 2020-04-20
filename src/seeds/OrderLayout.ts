import { OrderLayout as Model } from '../models/OrderLayout';
import {OrderLayout as EnumOrderLayout} from "../models/enum/OrderLayout"
import { OrderLayoutController } from '../controllers/OrderLayout';
import { Seed } from "./Seed";

export class OrderLayout extends Seed {

  public static Seed(log: Boolean = true) {
    const orderLayout = new OrderLayout(OrderLayoutController);
    return orderLayout.Executar(log);
  }

  public async Mock() {
    //*

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 1,
      "description": "Normal",
      "orderLayout": EnumOrderLayout.DEFAULT,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 2,
      "description": "Rotita Piquitita",
      "orderLayout": EnumOrderLayout.ROUTE,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
    
    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 3,
      "description": "Listosa Monstra",
      "orderLayout": EnumOrderLayout.LIST,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
  }
}