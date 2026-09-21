import { Customers } from "#cds-models/sales";

import { CustomerController } from "./interface";
import { CustomerService } from "../../services/customers/interface";

export class CustomerControllerImpl implements CustomerController {
    constructor(private readonly service: CustomerService) {}

    public afterRead(customerList: Customers): Customers {
        return this.service.afterRead(customerList);
    }
}
