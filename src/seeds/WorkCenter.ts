import { WorkCenterController } from '../controllers/WorkCenter';
import { Seed } from "./Seed";

export class WorkCenter extends Seed {

  public static async Seed(log: Boolean = true) {
    const workCenter = new WorkCenter(WorkCenterController);
    await workCenter.Executar(log);
  }

  public async Mock() {

    const workCenters = WorkCenter.getWorkCenters()

    for (let i = 0; i < workCenters.length; i++) {
      await this.CadastrarCrud({
        description: workCenters[i],
      });
    }
  }

  public static getWorkCenters() {
    return [
      'Elétrico',
      'Mecânico',
      'Instrume',
      'Lubrific',
      'Obras',
      'Terceiro',
    ]
  }
}