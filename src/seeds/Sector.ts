import { Sector as Model } from '../models/Sector';
import { SectorController } from '../controllers/Sector';
import { Seed } from "./Seed";

export class Sector extends Seed {

  public static async Seed(log: Boolean = true) {
    const sector = new Sector(SectorController);
    await sector.Executar(log);
  }

  public async Mock() {

    const sectors = Sector.getSectors()

    for (let i = 0; i < sectors.length; i++) {
      await this.CadastrarCrud({
        description: sectors[i],
      });
    }
  }

  public static getSectors() {
    return [
      'ALMOXARIFADO',
      'CAMARA CENTRAL REFRIGERADA',
      'FRACIONAMENTO',
      'TRANSPORTE INTERNO',
      'AROMAS EM PÓ',
      'COBERTURA',
      'EMUSTAB',
      'RECHEIOS',
      'PASTAS E VARIEGATOS',
      'CONDIMENTO',
      'CONDIMENTOS',
      'CORANTES/REVENDA',
      'ANÁLISE FISICO SENSORIAL',
      'ANÁLISE DE PRODUTOS',
      'ANÁLISE QUI/MICR/CRO',
      'ANÁLISE MICROBIOLOGIA',
      'APLICAÇÃO DE PRODUTO',
      'ATEND. A CLIENTES',
      'CENTRO TEC. E ADM.',
      'CONSELHO CFM',
      'DESENVOLVIMENTO DE PRODUTOS',
      'DESEN E PESQUISA DE PRODUTO',
      'FLAVORISTAS',
      'INFRAESTRUTURA DE TI',
      'AERONAVES',
      'INOVAÇÃO/TECN. JGA -USINA PILOTO',
      'INOVAÇÃO CENTER',
      'MARKETING',
      'PESAGEM E PREPARAÇÃO DE AMOSTRAS',
      'TRADE MARKETING - AMOSTRAS',
      'VENDAS AROMAS',
      'ASSISTENCIA TÉCNICA FRIGORIFICA',
      'S A DESTILARIA',
      'S A DESTILARIA SCHOTT',
      'DISTRIBUIÇÃO E ARMAZENAGEM',
      'EMULSÕES E LÍQUIDOS',
      'ESSENCIAS',
      'S A ESSÊNCIAS',
      'FLOCOS BABY FOOD',
      'GORDURA ANIMAL',
      'S.A. DEGELO',
      'DESIDRATADOS',
      'S A FLOCOS',
      'S A MAFOR',
      'S A EXTRATO DE MALTE/SUCOS',
      'ADMINISTRATIVO MANUTENÇÃO',
      'GERAÇÃO DE ENERGIA ELETRICA',
      'CENTRAL DE MOAGEM',
      'S A HVP LEVEDO',
      'LINHA DE MOLHOS',
      'GERENCIA REC. HUMANOS',
      'MEDICINA DO TRABALHO',
      'REFEITÓRIO',
      'SEG. MEDICINA/TRABALHO',
      'ZELADORIA',
      'CALDEIRAS',
      'FAZENDA S A CITRUS',
      'ESTAÇÃO DE TRATAMENTO AFLUENTE',
      'ESTAÇÃO DE TRATAMENTO EFLUENTE',
      'SERVIÇOS GERAIS',
      'CASEIRO',
      'SORVETINA',
      'SPRAY 2 E 4',
      'SPRAY 5 6 7 8 9',
      'SPRAY 8',
      'SPRAY 5 6 9',
    ];
  }
}