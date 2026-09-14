import { CustomerRepositoryImpl } from "../../repositories/customer/implementation";
import { ProductsRepositoryImpl } from "../../repositories/products/implementation";
import { SalesOrderHeaderServiceImpl } from "../../services/sales-order-headers/implementation";
import { SalesOrderHeaderService } from "../../services/sales-order-headers/interface";

const makeSalesOrderHeaderService = (): SalesOrderHeaderService => {
    const customerRepository = new CustomerRepositoryImpl();
    const productRepository = new ProductsRepositoryImpl();

    return new SalesOrderHeaderServiceImpl(productRepository, customerRepository);
}

export const salesOrderHeaderService = makeSalesOrderHeaderService();