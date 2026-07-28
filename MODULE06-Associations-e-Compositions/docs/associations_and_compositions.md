# Associations & Compositions

No CAP existe dois tipos de relacionamentos entre entidades de um programa: **Associações** e **Composições**.

## Principais Conceitos das Associations

- Não se pode estabelecer semanticamente uma hierarquia clara de pai e filho
- Você expõe as entidades de documento totalmente de forma independente
- Entidades com ciclos de vida independente
- Relacionamento que pode mudar ao longo do tempo
## Principais Conceitos das Compositions

- Pai e Filho compartilham um ciclo de vida
- Deleção em cascata quando a entidade pai é deletada
- Pode se estabelecer semanticamente relação de pai e filho
- Você nunca expõe uma entidade filha isoladamente
- O pai de um item nunca muda

## Associações Não Gerenciadas

As regras de relacionamento são configuradas manualmente com a clausula `on`. A associação é explicitamente definida.

``` CDS
entity SalesOrderHeaders : managed {
    key ID          : UUID;
        customer    : Association to Customers on customer.ID = customer_ID;
        customer_ID : type of Customers:ID; //> foreign key
}
```

``` CDS
entity Customers : managed {
    key ID        : UUID;
}
```

## Associações Gerenciadas

### To-One

Para relacionamento **um-para-um** o CAP consegue resolver e adicionar automaticamente a foreign key necessária, a partir da chave primária do destino, e adicionar implicitamente as condições de ***Joins***.

``` CDS
entity SalesOrderHeaders : managed {
    key ID          : UUID;
        customer    : Association to Customers;
}
```

Nesse exemplo a *foreign key* (customer_ID) é criada automaticamente no banco de dados quando ativado. Os nomes de elementos *foreign key* adicionados automaticamente não podem ser modificados depois.

Se a entidade destino tem apenas uma *primary key*, pode ser definido um valor padrão para a *foreign key*.

``` CDS
entity SalesOrderHeaders : managed {
    key ID          : UUID;
        customer    : Association to Customers default 17;
}

entity Customers : managed {
    key ID        : Integer;
}
```
 
### To-Many

Para relacionamento **um-para-muitos** especificar uma condição `on` seguindo o padrão: `<assoc>.<backlink> = $self`.

``` CDS
entity Orders {
    key ID       : Integer;
        products : Association to many Products
                       on products.order = $self;
}

entity Products {
    key ID    : Integer;
        order : Association to Orders; // backlink
}
```

O **backlink** pode ser qualquer associação **para-um** no lado **muitos** apontando de volta para o lado **um**.

### Many-To-Many

Seguir a pratica comum de resolver a lógica de relacionamento em dois relacionamentos **um-para-muitos** e usando uma entidade **link** para conectar os dois...

``` CDS
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
    book   : Association to Books;
}
```


## Compositions

Composições são relacionamentos com mais dependências entre as entidades pai e filho

``` CDS
entity SalesOrderHeaders : managed {
    key ID          : UUID;
        items       : Composition of many SalesOrderItems
                          on items.header = $self;
} 

entity SalesOrderItems : managed {
    key ID       : UUID;
        header   : Association to SalesOrderHeaders;
}
```

💡Por convenção não expomos as entidades filhas como serviços individuais. Acessamos pela entidade pai, usando o parâmetro `$expand`.