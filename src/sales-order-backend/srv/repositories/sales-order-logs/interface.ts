import { SalesOrderLogsModel } from "../../models/sales-order-logs";

export interface SalesOrderLogsRepository {
    create(logs: SalesOrderLogsModel[]): Promise<void>;
}