import { Customers } from "#cds-models/sales";

export interface CustomerService {
    afterRead(customersList: Customers): Customers;
}