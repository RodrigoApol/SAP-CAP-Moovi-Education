import { SalesOrderHeader, SalesOrderHeaders } from "#cds-models/sales";
import { CreationPaylaodValidationResult } from "../../models/sales-order-header";

export interface SalesOrderHeaderService {
    beforeCreate(params: SalesOrderHeader): Promise<CreationPaylaodValidationResult>
}