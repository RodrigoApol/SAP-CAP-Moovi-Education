import { SalesOrderHeader, SalesOrderHeaders, SalesOrderItem } from "#cds-models/sales";
import { User } from "@sap/cds";
import { CustomerModel } from "../../models/customer";
import { ProductModel } from "../../models/products";
import { CreationPaylaodValidationResult, SalesOrderHeaderModel } from "../../models/sales-order-header";
import { SalesOrderItemModel, SalesOrderItemProps } from "../../models/sales-order-item";
import { SalesOrderLogsModel } from "../../models/sales-order-logs";
import { CustomerRepository } from "../../repositories/customer/interface";
import { ProductsRepository } from "../../repositories/products/interface";
import { SalesOrderLogsRepository } from "../../repositories/sales-order-logs/interface";
import { SalesOrderHeaderService } from "./interface";
import { LoggedUserModel } from "../../models/logged-user";

export class SalesOrderHeaderServiceImpl implements SalesOrderHeaderService {

    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly customersRepository: CustomerRepository,
        private readonly salesOrderLogsRepository: SalesOrderLogsRepository) { }

    private async getProducts(items: SalesOrderHeader['items']): Promise<ProductModel[] | Error> {
        const productIds: string[] = items?.map((item: SalesOrderItem) => item.product_ID) as string[];
        const products = await this.productsRepository.findByIds(productIds);

        if (!products) {
            return new Error('Not found any product');
        }

        return products;
    }

    private async getCustomer(ID: SalesOrderHeader['ID']): Promise<CustomerModel | Error> {
        const customer = await this.customersRepository.findById(ID as string);

        if (!customer) {
            return new Error(`Not found any customer with ID: ${ID}`);
        }

        return customer;
    }

    private async getSalesOrderItems(params: SalesOrderHeader, products: ProductModel[]): Promise<SalesOrderItemModel[]> {
        return params.items?.map(item => SalesOrderItemModel.create({
            ID: item.ID as string,
            product_ID: item.product_ID as string,
            quantity: item.quantity as number,
            price: item.price as number,
            products: products
        })) as SalesOrderItemModel[]
    }

    private async getSalesOrderHeader(params: SalesOrderHeader, items: SalesOrderItemModel[]): Promise<SalesOrderHeaderModel> {
        const header = SalesOrderHeaderModel.create({
            ID: params.ID as string,
            customer_ID: params.customer_ID as string,
            items: items
        }) as SalesOrderHeaderModel

        return header
    }

    private async getLoggedUser(loggedUser: User) {
        const user = LoggedUserModel.create({
            id: loggedUser.id,
            roles: loggedUser.roles as string[]
        });

        return user;
    }

    public async beforeCreate(params: SalesOrderHeader): Promise<CreationPaylaodValidationResult> {
        const products = await this.getProducts(params.items);

        if (products instanceof Error) {
            return {
                hasError: true,
                errorMessage: products
            };
        }

        const items = await this.getSalesOrderItems(params, products);

        // const header = SalesOrderHeaderModel.create({
        //     ID: params.ID as string,
        //     customer_ID: params.customer_ID as string,
        //     items: items
        // }) as SalesOrderHeaderModel

        const header = await this.getSalesOrderHeader(params, items);

        // header.calculateTotalAmount();

        const customer = await this.getCustomer(params.customer_ID as string);

        if (customer instanceof Error) {
            return {
                hasError: true,
                errorMessage: customer
            };
        }

        const validationResult = header.validateInputPayload({ customer_ID: customer.ID });

        if (validationResult.hasError) {
            return validationResult;
        }

        return {
            hasError: false,
            totalAmount: header.calculateTotalAmount(),
        }
    }

    public async afterCreate(params: SalesOrderHeader, loggedUser: User): Promise<void> {
        const header = params;
        const logs: SalesOrderLogsModel[] = [];

        const products = await this.getProducts(header.items) as ProductModel[];
        const items = await this.getSalesOrderItems(header, products);
        const salesOrderHeaderModel = await this.getSalesOrderHeader(header, items);
        const productData = salesOrderHeaderModel.getProductData();

        for (const product of products) {
            const foundProduct = productData.find(pd => pd.ID === product.ID)
            product.sell(foundProduct?.quantity as number);
            await this.productsRepository.updateStock(product);
        }

        const user = await this.getLoggedUser(loggedUser);

        // const log = SalesOrderLogsModel.create({
        //     header_ID: header.ID as string,
        //     orderData: JSON.stringify(items),
        //     userData: JSON.stringify(user)
        // })

        // logs.push(log);


        // this.salesOrderLogsRepository.create(logs);
    }

}