# Annotations Relacionadas

## `@readonly` & `@insertonly`

Usamos essas **annotations** para controlar o tipo de operação aceito para determinada entidade ou elemento de entidade.

Ex.:

``` CDS
using {com.example as db} from './schema';

/* Exposição dos Livros através do serviço "Catalog" */
service CatalogService @(path: '/catalog'){
    entity Books   as projection on db.Books {};
    entity Reviews as projection on db.Reviews {};
} 

/** Permite apenas operações de leitura para a entidade */
annotate CatalogService.Books with @readonly;

/** Permite apenas operações de inserção para a entidade */
annotate CatalogService.Reviews with @insertonly;
```

- `@readonly` > Apenas leitura.
- `@insertonly` > Apenas escrita (inserção de dados).
## `@requires`

usado para controlar o acesso à recursos da aplicação, através de **roles** de acesso.

``` CDS
/** Permite que apenas usuários autenticados acessem o método */
annotate CatalogService.customAction with @(requires: 'autheticated-user');

/** Permite que apenas usuários autenticados com a role de 'admin' o método */
annotate CatalogService.customAction2 with @(requires: 'admin');
```

- `authenticated-user` é usado para permitir acesso para qualquer usuário autenticado na aplicação, independente da role atribuída.
- Quando especificamos uma role, como `admin`, dizemos que apenas usuários autenticados com essa role, podem acessar o recurso.

>[!TIP]
>**@requires** pode ser empregado em nível de acesso ao **Serviço**, **Entidade** ou **Elementos**

## `@restrict`

usando essa **annotation** é possível controlar de maneira mais modular os acessos aos recursos do sistema.

``` CDS
annotate CatalogService.Books with @(restrict: [
    {
        grant: [
            'CREATE',
            'UPDATE'
        ],
        to   : 'admin'
    },
    {
        grant: ['DELETE'],
        to   : 'admin',
        where: 'stock = 0'
    },
    {
        grant: ['READ'],
        to   : 'read_only_auth'
    }
]);
```

Estrutura:

``` shell
{ grant: <events>, to: <roles>, where: <filter-condition> }
```