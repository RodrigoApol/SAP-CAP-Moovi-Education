import { SalesOrderHeader } from "#cds-models/sales";
import { User } from "@sap/cds";

import { CreationPaylaodValidationResult } from "../../models/sales-order-header";

import { SalesOrderHeaderController } from "./interface";
import { SalesOrderHeaderService } from "../../services/sales-order-headers/interface";

export class SalesOrderHeaderControllerImpl implements SalesOrderHeaderController {
    constructor(private readonly service: SalesOrderHeaderService) { }

    beforeCreate(params: SalesOrderHeader): Promise<CreationPaylaodValidationResult> {
        return this.service.beforeCreate(params);
    }

    afterCreate(params: SalesOrderHeader, LoggedUser: User): Promise<void> {
        return this.service.afterCreate(params, LoggedUser);
    }
}
