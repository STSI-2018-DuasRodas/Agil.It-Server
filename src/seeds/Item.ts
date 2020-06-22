import { ItemController } from '../controllers/Item';
import { Seed } from "./Seed";
import { MeasurementUnitController } from '../controllers/MeasurementUnit';

export class Item extends Seed {

  public static async Seed(log: Boolean = true) {
    const item = new Item(ItemController);
    await item.Executar(log);
  }

  public async Mock() {

    const items = await Item.getItems()
  
    for (let i = 0; i < items.length; i++) {
      await this.CadastrarCrud({
        ...(await items[i]),
      });
    }
  }
  
  public static async getItems() {
    const equipments = Item.getArrayItems()

    return equipments.map(async equipment => {
      return {
        ...equipment,
        measurementUnit: await Item.MeasurementUnitByName(equipment.measurementUnit)
      }
    });
  }

  public static async MeasurementUnitByName(description) {
    const measurementUnitController = new MeasurementUnitController();

    const { id } = await measurementUnitController.getRepositoryEntity().findOneOrFail({
      where: {
        description: description,
      }
    });

    return id;
  }
  
  public static getArrayItems() {
    return [
      {
        'code': 502134,
        'description': 'ÓLEO SPARTAN EP 460 OU SP 460',
        'measurementUnit': 'L'
      },
      {
        'code': 502133,
        'description': 'ÓLEO SP 220 - BALDE 20 LITROS',
        'measurementUnit': 'L'
      },
      {
        'code': 504040,
        'description': 'GRAXA MULTIUSO EP 2',
        'measurementUnit': 'kg'
      },
      {
        'code': 502135,
        'description': 'ÓLEO IPIGEL 68 IPIRANGA',
        'measurementUnit': 'L'
      },
      {
        'code': 514752,
        'description': 'GRAXA MOBILGREASE XHP 462 Mobil;',
        'measurementUnit': 'kg'
      },
      {
        'code': 509005,
        'description': 'GRAXA CORALIA 2',
        'measurementUnit': 'kg'
      },
      {
        'code': 509628,
        'description': 'LUBRIFICANTE SPRAY ROCOL BELT DRESSING',
        'measurementUnit': 'UN'
      },
      {
        'code': 502353,
        'description': 'FILTRO CLASSE G3 AST150F',
        'measurementUnit': 'M'
      },
      {
        'code': 501666,
        'description': 'GAXETA 2006 1/2" ATÓXICO',
        'measurementUnit': 'kg'
      },
      {
        'code': 501628,
        'description': 'GAXETA 2019 TEFLONADA 1/2"',
        'measurementUnit': 'kg'
      },
      {
        'code': 501576,
        'description': 'GAXETA 2006 3/4"',
        'measurementUnit': 'kg'
      },
      {
        'code': 505784,
        'description': 'BOSCH RETENTOR 810.812.6400 22X35X7',
        'measurementUnit': 'UN'
      },
      {
        'code': 502114,
        'description': 'GAXETA 2019 1/4"',
        'measurementUnit': 'kg'
      },
      {
        'code': 502115,
        'description': 'GAXETA 2006 1/4" ATÓXICO',
        'measurementUnit': 'kg'
      },
      {
        'code': 501830,
        'description': 'GAXETA 2006 3/8" ATÓXICO',
        'measurementUnit': 'kg'
      },
      {
        'code': 501829,
        'description': 'GAXETA 2019 TEFLONADA 3/8"',
        'measurementUnit': 'kg'
      },
      {
        'code': 504958,
        'description': 'GAXETA 2006 7/16" ATÓXICO',
        'measurementUnit': 'kg'
      },
      {
        'code': 501589,
        'description': 'GAXETA 2006 5/8"',
        'measurementUnit': 'kg'
      },
      {
        'code': 501577,
        'description': 'GAXETA 2019 5/8"',
        'measurementUnit': 'kg'
      },
      {
        'code': 500936,
        'description': 'RETENTOR SABÓ 2533 TIPO BRG',
        'measurementUnit': 'UN'
      },
      {
        'code': 500888,
        'description': 'RETENTOR SABÓ 0992 TIPO BRG',
        'measurementUnit': 'UN'
      },
      {
        'code': 500930,
        'description': 'RETENTOR SABÓ 2233 TIPO BRG',
        'measurementUnit': 'UN'
      },
      {
        'code': 508878,
        'description': 'ÓLEO INTEROIL FGL 220 GRAU ALIMENTÍCIO',
        'measurementUnit': 'L'
      },
      {
        'code': 510363,
        'description': 'GRAXA INTERGRASE ALIPLEX 2 ALIMENTÍCIO',
        'measurementUnit': 'kg'
      },
      {
        'code': 504303,
        'description': 'ÓLEO SHELL TELLUS S2 M 68',
        'measurementUnit': 'L'
      },
      {
        'code': 502136,
        'description': 'ÓLEO SHELL TURBO OIL T 100 BL 20 L',
        'measurementUnit': 'L'
      },
      {
        'code': 513713,
        'description': 'GRAXA INTERGRASE ALIPLEX CA 102 ALIMENTI',
        'measurementUnit': 'kg'
      },
      {
        'code': 506096,
        'description': 'INTEROIL GEAR SYNT FGL 68',
        'measurementUnit': 'L'
      },
      {
        'code': 513697,
        'description': 'OLEO ATOXICO ROTO-FOODGRADE 20L',
        'measurementUnit': 'UN'
      },
      {
        'code': 513714,
        'description': 'OLEO KLUBER SUMMIT HYSYN FG 46 ATOX 20L',
        'measurementUnit': 'UN'
      },
      {
        'code': 509658,
        'description': 'FILTRO OLEO C/VALVULA 30PSI SRP-40/50 CV',
        'measurementUnit': 'UN'
      },
      {
        'code': 513988,
        'description': 'GRAXA INTERGREASE ALIPLEX S 00',
        'measurementUnit': 'kg'
      },
      {
        'code': 512509,
        'description': 'ÓLEO INTEROIL FGL 460',
        'measurementUnit': 'L'
      },
      {
        'code': 506122,
        'description': 'MANTA FILTRANTE AEROFIL C3G 500 X 20MM',
        'measurementUnit': 'M'
      },
      {
        'code': 514592,
        'description': 'GRAXA MOBIL POLYREX EM',
        'measurementUnit': 'UN'
      },
      {
        'code': 511502,
        'description': 'ROLAMENTO 625 ZZ',
        'measurementUnit': 'UN'
      },
      {
        'code': 502883,
        'description': 'FILTRO G3 600 X 600 X 25',
        'measurementUnit': 'UN'
      },
      {
        'code': 502884,
        'description': 'FILTRO G3 500 X 500 X 25',
        'measurementUnit': 'UN'
      },
      {
        'code': 510051,
        'description': 'FILTRO MB-065 DE 595X595X300MM CLASSE F8',
        'measurementUnit': 'UN'
      },
      {
        'code': 511675,
        'description': 'FILTRO BP3 600 X 500 X 50MM CLASSE M5',
        'measurementUnit': 'UN'
      },
      {
        'code': 506024,
        'description': 'FILTRO MANTA FIBRA (PES) CL: G4',
        'measurementUnit': 'M'
      },
      {
        'code': 503490,
        'description': 'FILT PROC FZ01 MUNTERS SPR 16x24x2” CLM5',
        'measurementUnit': 'UN'
      },
      {
        'code': 511655,
        'description': 'FILTRO PLISSADO 600x600x50 CLASSE M5',
        'measurementUnit': 'UN'
      },
      {
        'code': 509435,
        'description': 'ELEMENTO FILTRANTE REF K1825P',
        'measurementUnit': 'UN'
      },
      {
        'code': 508786,
        'description': 'FANCOIL FILTRO BOLSA 600 X 600 F3',
        'measurementUnit': 'UN'
      },
      {
        'code': 508787,
        'description': 'FILTRO PANO 300 X 600 G3 25MM FANCOIL',
        'measurementUnit': 'UN'
      },
      {
        'code': 514443,
        'description': 'FILTRO FZ-01F MD PAPE 550X590X50 CLAS-M5',
        'measurementUnit': 'UN'
      },
      {
        'code': 514444,
        'description': 'FILTRO FZ-01 GALV 595X595X48MM CLASSE M5',
        'measurementUnit': 'UN'
      },
      {
        'code': 514925,
        'description': 'VEDAÇÃO PERFIL RETAN BRAN 1X1/4 POL ATOX',
        'measurementUnit': 'M'
      }
    ]
  }
}