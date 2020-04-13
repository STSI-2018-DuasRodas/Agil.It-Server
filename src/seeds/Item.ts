import { Item as Model } from '../models/Item';
import { ItemController } from '../controllers/Item';
import { Seed } from "./Seed";

export class Item extends Seed {

  public static Seed(log: Boolean = true) {
    const item = new Item(ItemController);
    return item.Executar(log);
  }

  public async Mock() {
    //*

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 1,
      "description": "Parafuso Boca de Jacaré",
      "measurementUnit": 1,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 2,
      "description": "Fio de Estanho",
      "measurementUnit": 2,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
    
    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 3,
      "description": "Cartucho de Prego de Cabeça com 50 unidades",
      "measurementUnit": 3,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
  }
}