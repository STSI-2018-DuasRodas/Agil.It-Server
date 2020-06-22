import { DefectOriginController } from '../controllers/DefectOrigin';
import { Seed } from "./Seed";

export class DefectOrigin extends Seed {

  public static async Seed(log: Boolean = true) {
    const defectOrigin = new DefectOrigin(DefectOriginController);
    await defectOrigin.Executar(log);
  }

  public async Mock() {

    const defectOrigins = DefectOrigin.getDefectOrigins()
  
    for (let i = 0; i < defectOrigins.length; i++) {
      await this.CadastrarCrud({
        ...defectOrigins[i],
      });
    }
  }
  
  public static getDefectOrigins() {
    return [
      {
        description:'Refrigerador Desregulado',
        machineType: 1,
      },
      {
        description:'Componente Frouxo',
        machineType: 2,
      },
      {
        description:'Chapa Amassada',
        machineType: 3,
      },
    ]
  }
}