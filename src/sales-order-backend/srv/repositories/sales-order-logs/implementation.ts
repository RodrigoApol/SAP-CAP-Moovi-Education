import cds from "@sap/cds";
import { SalesOrderLogsModel } from "../../models/sales-order-logs";
import { SalesOrderLogsRepository } from "./interface";

export class SalesOrderLogsRepositoryImpl implements SalesOrderLogsRepository {
    public async create(log: SalesOrderLogsModel): Promise<void> {
        const logObject = log.toObject();

        const insert = INSERT(logObject).into('sales.SalesOrderLogs');
        await cds.run(insert);
    }
}