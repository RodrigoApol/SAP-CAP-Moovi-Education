# Tipos Cutomizados

## Tipos Simples

Construído em cima de outro tipo primitivo.

``` CDS
define type NumOfBooks : Integer;

define entity Books {
    stock : NumOfBooks;
}
```

No Exemplo acima o tipo `NumOfbooks` é essencialmente um `Integer`.

## Tipos Estruturados

Combinam um ou mais elementos relacionados para gerar uma estrutura de dados mais complexa.

``` CDS
entity Books {
    price : Price;
}

type Price {
    amount   : Decimal(10, 2);
    currancy : String(3);
}
```

## Enumeradores

`Enums` permitem padronizar elementos em valores padronizados.

``` CDS
entity Books {
    genre : Genre;
}

type Genre : Integer enum {
    fiction = 1;
    non_fiction = 2;
}
```