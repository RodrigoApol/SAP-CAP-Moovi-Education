namespace cap.schema.example;

// One-To-Many
entity Orders {
    key ID       : Integer;
        products : Association to many Products
                       on products.order = $self;
}

entity Products {
    key ID    : Integer;
        order : Association to Orders; // backlink
}

// Many-To-Many

aspect simplekey {
    key ID : Integer;
}

entity Books : simplekey {
    authors : Association to many Authors_Books
                  on authors.book = $self;
}

entity Authors : simplekey {
    books : Association to many Authors_Books
                on books.author = $self;
}

entity Authors_Books : simplekey {
    author : Association to Authors;
    book   : Association to Books;
}
