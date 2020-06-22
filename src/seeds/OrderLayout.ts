import {OrderLayout as EnumOrderLayout} from "../models/enum/OrderLayout"
import { OrderLayoutController } from '../controllers/OrderLayout';
import { Seed } from "./Seed";

export class OrderLayout extends Seed {

  public static async Seed(log: Boolean = true) {
    const orderLayout = new OrderLayout(OrderLayoutController);
    await orderLayout.Executar(log);
  }
  
  public async Mock() {

    const layouts = OrderLayout.getLayouts()

    for (let i = 0; i < layouts.length; i++) {
      await this.CadastrarCrud({
        ...layouts[i],
      });
    }
  }
  
  public static getLayouts() {
    return [
      {
        'orderLayout': EnumOrderLayout.LIST,
        'type': 'ZPM1',
        'classification': 'LISTA',
      },
      {
        'orderLayout': EnumOrderLayout.ROUTE,
        'type': 'ZPM1',
        'classification': 'ROTA',
      },
      {
        'orderLayout': EnumOrderLayout.DEFAULT,
        'type': 'ZPM2',
        'classification': 'CORRETIVA',
      },
      {
        'orderLayout': EnumOrderLayout.DEFAULT,
        'type': 'ZPM4',
        'classification': 'PROGRAMADA',
      },
    ]
  }
}