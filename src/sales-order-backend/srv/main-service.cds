using {sales as db} from '../db/schema';

service mainService {
    entity SalesOrderHeaders as projection on db.SalesOrderHeaders;
}
