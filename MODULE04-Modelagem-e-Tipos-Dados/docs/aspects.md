# Aspects

Os `aspect` são estruturas já pré-definidas que auxiliam na criação de entidades complexas. Usando esse recurso, evitamos retrabalho durante o desenvolvimento das entidades, e podem extender nossos modelos de domínio, de maneira eficiente e rica.

Para importar *aspects* específicos e outros tipos de dados pré-definidos, importar do módulo: **@sap/cds/common**.

## `cuid`

O `cuid` é um `aspect` que contém a definição de uma *primary key*, assim não precisamos declarar em todas as entidades o elemento `Key ID : UUID`.

Definição:

``` CDS
aspect cuid {
  key ID : UUID; //> automatically filled in
}
```

Exemplo:

``` CDS
entity Entidade : cuid {
    Key ID : UUID; //> It's not necessary.
}
```

## `managed`

Contém a definição dos campos `createdAt`, `createdBy`, `modifiedAt` e `modifiedBy`. Bem utilizáveis para o controle de criação e modificação (quem e quando) das entidades do nosso domínio.

Definição:

``` CDS
aspect managed {
  createdAt  : Timestamp @cds.on.insert : $now;
  createdBy  : User      @cds.on.insert : $user;
  modifiedAt : Timestamp @cds.on.insert : $now  @cds.on.update : $now;
  modifiedBy : User      @cds.on.insert : $user @cds.on.update : $user;
}
```

- `$now`: é preenchido pelo *DataTime* atual do servidor (em UTC).
- `$user`: é preenchido pelo ID do usuário, recebido do *middleware* de autenticação.
Exemplo:

``` CDS
entity EntidadeGerenciada : managed {
    key ID : Integer;
    // createdAt, createdBy, modifiedAt, modifiedBy implícitos.
}
```

