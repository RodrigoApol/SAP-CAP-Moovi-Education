import { User } from "@sap/cds";

import { SalesOrderHeader } from "@models/sales";

import { CreationPaylaodValidationResult } from "@/models/sales-order-header";

export interface SalesOrderHeaderService {
    beforeCreate(params: SalesOrderHeader): Promise<CreationPaylaodValidationResult>;
    afterCreate(params: SalesOrderHeader, loggedUser: User): Promise<void>;
}
