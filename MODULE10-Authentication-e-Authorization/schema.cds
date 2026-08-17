namespace com.example;

using {
    cuid,
    managed
} from '../src/sales-order-backend/node_modules/@sap/cds/common';

entity Books : managed, cuid {
    name          : String(100);
    dateOfPublish : Date;
    review        : Association to many Reviews
                        on review.book = $self;
    stock         : Integer
}

entity Reviews : managed, cuid {
    description : String(250);
    stars       : Integer @assert.range: [
        0,
        5
    ];
    book        : Association to Books;
}
