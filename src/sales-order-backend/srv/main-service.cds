using {sales as db} from '../db/schema';

service mainService {
    entity SalesOrderHeaders as projection on db.SalesOrderHeaders;
    entity Customers         as projection on db.Customers;
    entity Products          as projection on db.Products;
}
