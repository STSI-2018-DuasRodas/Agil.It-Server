import { DefaultObservationController } from '../controllers/DefaultObservation';
import { Seed } from "./Seed";

export class DefaultObservation extends Seed {

  public static async Seed(log: Boolean = true) {
    const defaultObservation = new DefaultObservation(DefaultObservationController);
    await defaultObservation.Executar(log);
  }

  public async Mock() {

    const observations = DefaultObservation.getDefaultObservations()

    for (let i = 0; i < observations.length; i++) {
      await this.CadastrarCrud({
        description: observations[i],
      });
    }
  }

  public static getDefaultObservations() {
    return [
      'Parafuso Espanado',
      'Fusível Queimado',
      'Sobrecarga Elétrica'
    ]
  }
}