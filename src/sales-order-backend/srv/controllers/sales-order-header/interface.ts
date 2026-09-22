import { User } from "@sap/cds";

import { SalesOrderHeader } from "@models/sales";

import { CreationPaylaodValidationResult } from "@/models/sales-order-header";

export interface SalesOrderHeaderController {
    beforeCreate(params: SalesOrderHeader): Promise<CreationPaylaodValidationResult>;
    afterCreate(params: SalesOrderHeader, LoggedUser: User): Promise<void>;
}
