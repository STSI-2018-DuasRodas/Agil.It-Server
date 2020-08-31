import { getRepository, Repository } from "typeorm";
import { SecurityParam } from "../models/SecurityParam";
import {NextFunction, Request, Response} from "express";
import { flat } from './Utils';
import { MaintenanceOrderController } from "./MaintenanceOrder";

export class OrderSafetyParamsController {

  private repository : Repository<SecurityParam>;

  constructor() {
    this.repository = getRepository(SecurityParam)
  }
  
	public getRepository(): Repository<SecurityParam> {
		return this.repository;
  }

  public async getOrderSafetyParams(request: Request, response: Response, next: NextFunction) {
    const orderId = request.params.maintenanceOrderId;

    const maintenanceOrder = await new MaintenanceOrderController().getOrderById(orderId);
    if (!maintenanceOrder) throw `Ordem ${orderId} não cadastrada`;

    if (!Array.isArray(maintenanceOrder.orderEquipment)) maintenanceOrder.orderEquipment = [];

    const params = {
      ...{ equipmentClass: 'equipment', equipmentValues: flat(maintenanceOrder.orderEquipment?.map(e => e.id)) },
      ...{ sectorClass: 'sector', sectorValues: flat(maintenanceOrder.orderEquipment?.map(e => e.installationArea?.sector?.id)) },
      ...{ instalationAreaClass: 'instalation-area', instalationAreaValues: flat(maintenanceOrder.orderEquipment?.map(e => e.installationArea?.id)) },
      ...{ machineTypeClass: 'machine-type', machineTypeValues: flat(maintenanceOrder.orderEquipment?.map(e => e.equipment?.machineType?.id)) },
      ...{ superiorEquipmentClass: 'superior-equipment', superiorEquipmentValues: flat(maintenanceOrder.orderEquipment?.map(e => e.superiorEquipment?.id)) },
      ...{ workCenterClass: 'work-center', workCenterValue: maintenanceOrder.workCenter?.id }
    }

    const query = `
      SELECT * FROM security_param
      WHERE deleted = 0
      AND (
        useAlways = 1
        OR (
          entityClass = '${params.equipmentClass}' AND entityId in (${params.equipmentValues})
          OR (entityClass = '${params.sectorClass}' AND entityId in (${params.sectorValues}))
          OR (entityClass = '${params.instalationAreaClass}' AND entityId in (${params.instalationAreaValues}))
          OR (entityClass = '${params.machineTypeClass}' AND entityId in (${params.machineTypeValues}))
          OR (entityClass = '${params.superiorEquipmentClass}' AND entityId in (${params.superiorEquipmentValues}))
          OR (entityClass = '${params.workCenterClass}' AND entityId = ${params.workCenterValue})
        )
      )
    `

    return this.getRepository().query(query);
  }
}