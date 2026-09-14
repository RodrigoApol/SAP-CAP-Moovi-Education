import { SalesOrderHeader } from "#cds-models/sales";
import { CreationPaylaodValidationResult } from "../../models/sales-order-header";
import { SalesOrderHeaderService } from "../../services/sales-order-headers/interface";
import { SalesOrderHeaderController } from "./interface";

export class SalesOrderHeaderControllerImpl implements SalesOrderHeaderController {
    constructor(private readonly service: SalesOrderHeaderService) { }

    beforeCreate(params: SalesOrderHeader): Promise<CreationPaylaodValidationResult> {
        return this.service.beforeCreate(params);
    }
}