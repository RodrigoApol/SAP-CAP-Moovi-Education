import { SalesOrderHeaderController } from "@/controllers/sales-order-header/interface";
import { SalesOrderHeaderControllerImpl } from "@/controllers/sales-order-header/implementation";
import { salesOrderHeaderService } from "@/factories/services/sales-order-header";

const makeSalesOrderHeaderController = (): SalesOrderHeaderController => {
    return new SalesOrderHeaderControllerImpl(salesOrderHeaderService);
};

export const salesOrderHeaderController = makeSalesOrderHeaderController();
