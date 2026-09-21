import { CustomerService } from "../../services/customers/interface";
import { CustomerServiceImpl } from "../../services/customers/implementation";

const makeCustomerService = (): CustomerService => {
    return new CustomerServiceImpl();
};

export const customerService = makeCustomerService();
