import { DefectSymptom as Model } from '../models/DefectSymptom';
import { DefectSymptomController } from '../controllers/DefectSymptom';
import { Seed } from "./Seed";

export class DefectSymptom extends Seed {

  public static async Seed(log: Boolean = true) {
    const defectSymptom = new DefectSymptom(DefectSymptomController);
    await defectSymptom.Executar(log);
  }

  public async Mock() {

    const defectSymptoms = DefectSymptom.getDefectSymptoms()

    for (let i = 0; i < defectSymptoms.length; i++) {
      await this.CadastrarCrud({
        ...defectSymptoms[i],
      });
    }
  }
  
  public static getDefectSymptoms() {
    return [
      {
        description:'Sobreaquecimento',
        machineType: 1,
      },
      {
        description:'Componente Quebrado',
        machineType: 2,
      },
      {
        description:'Desalinhamento das lâminas',
        machineType: 3,
      },
    ]
  }
}