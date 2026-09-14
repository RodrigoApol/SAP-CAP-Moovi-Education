import { SalesOrderHeaderControllerImpl } from "../../controllers/sales-order-header/implementation";
import { SalesOrderHeaderController } from "../../controllers/sales-order-header/interface";
import { salesOrderHeaderService } from "../services/sales-order-header";

const makeSalesOrderHeaderController = (): SalesOrderHeaderController => {
    return new SalesOrderHeaderControllerImpl(salesOrderHeaderService);
}

export const salesOrderHeaderController = makeSalesOrderHeaderController();