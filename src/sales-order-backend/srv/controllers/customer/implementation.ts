import { Customers } from "#cds-models/sales";
import { CustomerService } from "../../services/customers/interface";
import { CustomerController } from "./interface";

export class CustomerControllerImpl implements CustomerController {
    constructor(private readonly service: CustomerService) { }

    public afterRead(customerList: Customers): Customers {
        return this.service.afterRead(customerList)
    }
}