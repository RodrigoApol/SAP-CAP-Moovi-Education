import cds from "@sap/cds";

import { Customers, Customer } from "#cds-models/sales";
import { CustomerProps, CustomerModel } from "../../models/customer";
import { CustomerRepository } from "./interface";

export class CustomerRepositoryImpl implements CustomerRepository {
    public async findById(id: CustomerProps["ID"]): Promise<CustomerModel> {
        const customerQuery = SELECT.one.from(Customers).where({ ID: id });
        const customer: Customer = await cds.run(customerQuery);

        const props = {
            ID: customer.ID as string,
            firstName: customer.firstName as string,
            lastName: customer.lastName as string,
            email: customer.email as string
        };

        return CustomerModel.create(props);
    }
}