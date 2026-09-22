import { User } from "@sap/cds";

import { SalesOrderHeader } from "@models/sales";

import { CreationPaylaodValidationResult } from "@/models/sales-order-header";
import { SalesOrderHeaderController } from "@/controllers/sales-order-header/interface";
import { SalesOrderHeaderService } from "@/services/sales-order-headers/interface";

export class SalesOrderHeaderControllerImpl implements SalesOrderHeaderController {
    constructor(private readonly service: SalesOrderHeaderService) { }

    beforeCreate(params: SalesOrderHeader): Promise<CreationPaylaodValidationResult> {
        return this.service.beforeCreate(params);
    }

    afterCreate(params: SalesOrderHeader, LoggedUser: User): Promise<void> {
        return this.service.afterCreate(params, LoggedUser);
    }
}
