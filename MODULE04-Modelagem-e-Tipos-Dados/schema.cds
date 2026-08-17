namespace com.sap.learning;

using {
    cuid,
    managed
} from '../src/sales-order-backend/node_modules/@sap/cds/common';

// define type NumOfBooks : Integer;

// define entity Books {
//     stock : NumOfBooks;
// }

// entity Books {
//     price : Price;
// }

// type Price {
//     amount   : Decimal(10, 2);
//     currancy : String(3);
// }

entity Books {
    genre : Genre;
}

type Genre : Integer enum {
    fiction = 1;
    non_fiction = 2;
}

entity Entidade : cuid {
    // Key ID : UUID; > It's not necessary
}

entity EntidadeGerenciada : managed {
    key ID : Integer;
// createdAt, createdBy, modifiedAt, modifiedBy implícitos.
}
