using {com.example as db} from './schema';

/* Exposição dos Livros através do serviço "Catalog" */
service CatalogService @(path: '/catalog') {
    entity Books   as projection on db.Books {};

    entity Reviews as projection on db.Reviews {};

    action customAction(book: db.Books:ID, review: db.Reviews:ID)  returns {
        /** ... */
    };

    action customAction2(book: db.Books:ID, review: db.Reviews:ID) returns {
        /** ... */
    }
};

/** Permite apenas operações de leitura para a entidade
/* annotate CatalogService.Books with @readonly; */

annotate CatalogService.Books with @(restrict: [
    {
        grant: [
            'CREATE',
            'UPDATE'
        ],
        to   : 'admin'
    },
    {
        grant: ['DELETE'],
        to   : 'admin',
        where: 'stock = 0'
    },
    {
        grant: ['READ'],
        to   : 'read_only_auth'
    }
]);

/** Permite apenas operações de inserção para a entidade */
annotate CatalogService.Reviews with @insertonly;

/** Permite que apenas usuários autenticados acessem o método */
annotate CatalogService.customAction with @(requires: 'autheticated-user');

/** Permite que apenas usuários autenticados com a role de 'admin' o método */
annotate CatalogService.customAction2 with @(requires: 'admin');
