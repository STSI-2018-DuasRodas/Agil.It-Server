import { SecurityParam as Model } from '../models/SecurityParam';
import { SecurityParamController } from '../controllers/SecurityParam';
import { Seed } from "./Seed";
import { SecurityParamEntity } from '../models/enum/SecurityParamEntity';

export class SecurityParam extends Seed {

  public static async Seed(log: Boolean = true) {
    const securityParam = new SecurityParam(SecurityParamController);
    await securityParam.Executar(log);
  }

  public async Mock() {

    const securityParams = SecurityParam.getSecurityParams()

    for (let i = 0; i < securityParams.length; i++) {
      await this.CadastrarCrud({
        ...securityParams[i],
      });
    }
  }
  
  public static getSecurityParams() {
    return [
      {
        "description":"Mascara de Calor",
        "entityClass": SecurityParamEntity.MACHINE_TYPE,
        "entityId": 1,
        "useAlways": false,
      },
      {
        "description":"Luvas de Proteção",
        "entityClass": SecurityParamEntity.WORK_CENTER,
        "entityId": 2,
        "useAlways": false,
      },
      {
        "description":"Sapato de Proteção",
        "entityClass": null,
        "entityId": null,
        "useAlways": true,
      },
    ]
  }
}