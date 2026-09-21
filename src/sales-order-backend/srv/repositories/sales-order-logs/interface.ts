import { SalesOrderLogsModel } from "../../models/sales-order-logs";

export interface SalesOrderLogsRepository {
    create(log: SalesOrderLogsModel): Promise<void>;
}
