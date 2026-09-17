import { CustomerRepositoryImpl } from "../../repositories/customer/implementation";
import { ProductsRepositoryImpl } from "../../repositories/products/implementation";
import { SalesOrderLogsRepositoryImpl } from "../../repositories/sales-order-logs/implementation";
import { SalesOrderHeaderServiceImpl } from "../../services/sales-order-headers/implementation";
import { SalesOrderHeaderService } from "../../services/sales-order-headers/interface";

const makeSalesOrderHeaderService = (): SalesOrderHeaderService => {
    const customerRepository = new CustomerRepositoryImpl();
    const productRepository = new ProductsRepositoryImpl();
    const salesOrderLogsRepository = new SalesOrderLogsRepositoryImpl();

    return new SalesOrderHeaderServiceImpl(productRepository, customerRepository, salesOrderLogsRepository);
}

export const salesOrderHeaderService = makeSalesOrderHeaderService();