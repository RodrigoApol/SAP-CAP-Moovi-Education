import { CustomerModel, CustomerProps } from "../../models/customer";

export interface CustomerRepository {
    findById(id: CustomerProps["ID"]): Promise<CustomerModel | null>;
}
