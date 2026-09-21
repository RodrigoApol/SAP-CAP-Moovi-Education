import { SalesOrderLogsModel } from "../../models/sales-order-logs";
import { SalesOrderLogsRepository } from "./interface";

import cds from "@sap/cds";

export class SalesOrderLogsRepositoryImpl implements SalesOrderLogsRepository {
    public async create(log: SalesOrderLogsModel): Promise<void> {
        const logObject = log.toObject();

        const insert = INSERT(logObject).into("sales.SalesOrderLogs");
        await cds.run(insert);
    }
}
