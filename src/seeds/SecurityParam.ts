import { SecurityParam as Model } from '../models/SecurityParam';
import { SecurityParamController } from '../controllers/SecurityParam';
import { Seed } from "./Seed";
import { SecurityParamEntity } from '../models/enum/SecurityParamEntity';

export class SecurityParam extends Seed {

  public static Seed(log: Boolean = true) {
    const securityParam = new SecurityParam(SecurityParamController);
    return securityParam.Executar(log);
  }

  public async Mock() {
    //*

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 1,
      "description":"Mascara de Calor",
      "entityClass": SecurityParamEntity.MACHINE_TYPE,
      "entityId": 1,
      "useAlways": false,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 2,
      "description":"Luvas de Proteção",
      "entityClass": "",
      "entityId": "",
      "useAlways": true,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
    
    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 3,
      "description":"Sapato de Proteção",
      "entityClass": "",
      "entityId": "",
      "useAlways": true,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
  }
}