import { CustomerModel } from "../../models/customer";
import { CustomerService } from "./interface";

import { Customers } from "#cds-models/sales";

export class CustomerServiceImpl implements CustomerService {
    public afterRead(customersList: Customers): Customers {
        const customers = customersList.map(cust => {
            const props = {
                ID: cust.ID as string,
                firstName: cust.firstName as string,
                lastName: cust.lastName as string,
                email: cust.email as string
            };

            /** CHANGE TO CREATE WITH STATIC METHOD
             * const customer = new CustomerModel(props);
            */

            const customer = CustomerModel.create(props);

            return customer
                .setDefaultEmailDomain()
                .toObject();
        });

        return customers;
    }
}
