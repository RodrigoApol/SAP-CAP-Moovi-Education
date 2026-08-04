using {managed} from '@sap/cds/common';

namespace sales;

entity SalesOrderHeaders : managed {
    key ID          : UUID;
        customer    : Association to Customers;
        items       : Composition of many SalesOrderItems
                          on items.header = $self;
        totalAmount : Decimal(15, 2);
}

entity SalesOrderItems : managed {
    key ID       : UUID;
        header   : Association to SalesOrderHeaders;
        product  : Association to Products;
        quantity : Integer;
        price    : Decimal(15, 2);
}

entity Customers : managed {
    key ID        : UUID;
        firstName : String(100);
        lastName  : String(100);
        email     : String(100);
}

entity Products : managed {
    key ID    : UUID;
        name  : String(100);
        price : Decimal(15, 2);
        stock : Integer;
}
