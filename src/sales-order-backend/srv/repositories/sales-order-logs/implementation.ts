import cds from "@sap/cds";
import { SalesOrderLogsModel } from "../../models/sales-order-logs";
import { SalesOrderLogsRepository } from "./interface";

export class SalesOrderLogsRepositoryImpl implements SalesOrderLogsRepository {
    public async create(logs: SalesOrderLogsModel[]): Promise<void> {
        const logsObjects = logs.map(log => log.toObject());

        const insert = INSERT(logsObjects).into('sales.SalesOrderLogs');
        await cds.run(insert);
    }
}