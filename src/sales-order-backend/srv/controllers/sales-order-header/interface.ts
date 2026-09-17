import { SalesOrderHeader, SalesOrderHeaders } from "#cds-models/sales";
import { User } from "@sap/cds";
import { CreationPaylaodValidationResult } from "../../models/sales-order-header";

export interface SalesOrderHeaderController {
    beforeCreate(params: SalesOrderHeader): Promise<CreationPaylaodValidationResult>;
    afterCreate(params: SalesOrderHeader, LoggedUser: User): Promise<void>;
}