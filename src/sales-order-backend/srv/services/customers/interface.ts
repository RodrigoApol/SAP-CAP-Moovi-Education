import { Customers } from "@models/sales";

export interface CustomerService {
    afterRead(customersList: Customers): Customers;
}
