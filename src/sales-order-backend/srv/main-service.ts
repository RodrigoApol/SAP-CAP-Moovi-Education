import { Customer, Customers } from '#cds-models/sales';

const cust: Customer = {
    firstName: "Rodrigo",
    lastName: "Araujo",
    email: "araujo.rod@teste.com"
}

const customers: Customers = [cust]
const funcao = (cust: Customer) => console.log(cust.firstName);

funcao(cust);