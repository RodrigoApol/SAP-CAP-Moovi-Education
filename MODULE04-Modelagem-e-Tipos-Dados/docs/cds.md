## Linguagem com foco na modelagem de dados de maneira declarativa no SAP CAP

### 01. Vantagens no uso de CDS

- **Abstração de banco de dados**: Define o modelo de dados de forma agnóstica ao banco. (Mas não é um **ORM**)
- **Melhor organização**: Separação entre modelos de dados, lógica de negócios e persistência.
- **Integração com BTP**: Excelente integração com os serviços da plataforma.
- **Extensabilidade**: Permite sobrecarga de modelos via *aspects*.
- **Automação**: Gera automaticamente **OData Services** e APIs REST a partir do modelo de dados
### 02. Definição de Entidades

No CDS, os dados são modelados como entidades, que representam tabelas no banco de dados.
Entidade são definidas usando a palavra reservada **entity**, e nelas são definidas as chaves e associações com outras entidades.

``` CDS
using { Currency, managed, sap } from '@sap/cds/common';
namespace sap.capire.bookshop;

entity Books : managed {
  key ID : Integer;
  title  : localized String;
  descr  : localized String;
  author : Association to Authors;
  genre  : Association to Genres;
  stock  : Integer;
  price  : Decimal;
  currency : Currency;
}

entity Authors : managed {
  key ID : Integer;
  name   : String;
  books  : Association to many Books on books.author = $self;
}

entity Genres : sap.common.CodeList {
  key ID : Integer;
  parent : Association to Genres;
}
```

No exemplo acima:
- **Books**, **Authors** e **Genres** são as entidades que representaram as tabelas no banco de dados.
- `Key ID : UUID` define a chave primária.
-  A palavra reservada **Association** define a relação com **to** ou **to many** dependendo da cardinalidade.
``` CDS
// entity Books
author : Association to Authors;
genre  : Association to Genres;
```
- Um livro tem exatamente um autor e um gênero.
``` CDS
// entity Authors
books  : Association to many Books on books.author = $self;
```
- Um autor pode ter muitos livros
``` CDS
// entity Genres
parent : Association to Genres;
```
- O gênero faz uma associação recursiva (self-association), com outra instância de gênero.
### 03. Tipos de Dados Customizados

Tipos de dados customizados podem ser reutilizados em várias entidades para garantir consistência. Para definir um tipo customizado, utiliza-se a palavra reservada **type**.

``` CDS
type Pice : Decimal(10, 2);

entity Orders {
    key ID       : UUID;
        amount   : Pice;
        currancy : String(3);
}
```

Nesse exemplo, **Price** é um tipo de dado reutilizável para valor monetário.
### 04. Associations Vs. Compositions

- **Associação**: Relacionamento entre entidades sem exclusão em cascata.
- **Composition**: Relacionamento entre entidades (hierarquia), permite exclusão em cascata
### 05. Annotations

Anotações permitem adicionar metadados para personalizar APIs e interfaces de usuário. As principais anotações usadas no CAP são:

- **UI Annotations (@UI...)**: Usadas principalmente para definir elementos da interface do usuário, que serão interpretados como componentes Fiori.
- **OData / Services Annotations**: Definir componentes da exposição do serviço OData. ***@path***, define o caminho do endpoint, ***readonly***, ***insertonly***, essas annotations definem quais métodos a entidade vai suportar (GET, POST...), ***@capabilities*** também permite customizar o comportamento padrão do serviço OData.
- **Persistence**: Anotações voltadas para persistência no banco de dados.
- **Segurança**: Define campos obrigatórios, exige roles específicas, define tamanho limite dos campos, etc...
### 06. Services e APIs OData
**Services** expõem as entidades como serviços OData, abstraindo toda a implementação dos métodos de inserção, atualização, leitura e deleção (CRUD). Podendo, criar métodos e implementações customizadas, se desejado.

### Extra Docs:

- [Common Annotations](https://cap.cloud.sap/docs/cds/annotations#services-apis)
- [Services & APIs](https://cap.cloud.sap/docs/guides/services/)
- [Core Data Services](https://cap.cloud.sap/docs/cds/)