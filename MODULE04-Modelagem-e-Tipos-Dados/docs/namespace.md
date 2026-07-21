O **namespace** é o agrupamento lógico que organiza e identifica as entidades do modelo de dados. Em outras palavras definimos as entidades dentro de um **namespace** para que a organização do código fique "melhor" entendido internamente.

``` 
namespace my.company.sales;

entity Customer {
    key ID : UUID;
    name   : String;
}

entity Order {
    key ID : UUID;
}
```

No exemplo acima as entidades **Customer** e **Order** estão dentro do **namespace** `my.company.sales`. Por baixo dos panos essas entidades serão identificadas como:
- `my.company.sales.Customer`
- `my.company.sales.Order`
Isso garante que cada nome será único dentro do nosso programa, e até mesmo dando erro caso isso não esteja corretamente configurado.

Quando essas entidades tiverem suas respectivas tabelas no banco de dados, o namespace virá como prefixo delas. Por exemplo:

```
MY_COMPANY_SALES_CUSTOMER
MY_COMPANY_SALES_ORDER
```

Mas isso é apenas a consequência de sua aplicação, dentro do CAP usamos o namespace em praticamente tudo... *imports*, *associations*, *services*, etc...

## Extra Doc

[The Namespace Directive](https://cap.cloud.sap/docs/cds/cdl#the-namespace-directive)
