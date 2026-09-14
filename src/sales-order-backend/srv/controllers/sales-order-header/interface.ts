import { SalesOrderHeader } from "#cds-models/sales";
import { CreationPaylaodValidationResult } from "../../models/sales-order-header";

export interface SalesOrderHeaderController {
    beforeCreate(params: SalesOrderHeader): Promise<CreationPaylaodValidationResult>
}