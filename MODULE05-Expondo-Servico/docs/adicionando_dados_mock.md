# Adicionando Dados Simulados (Mock)

No **CAP** podemos adicionar dados de testes (Mocks) de algumas maneiras...

- Com o comando `cds add data`: Esse comando cria dados automaticamente em um diretório **db/data**. Podemos passar alguns argumentos para esse comando, como `--recors | -n` que diz ao **CAP** a quantidade de registros que devem ser criados. E `--out`, que define o diretório destino para os *mocks*.
- Usando *custom Event Handler*:
``` JavaScript
import cds from '@sap/cds';

export default (srv) => {
    srv.on('READ', 'SalesOrderHeaders', () => [
        {
            "ID": "5336100b-bb59-4b32-8331-69179f5b74e5",
            "createdAt": "2008-12-09T02:00:00.000Z",
            "createdBy": "createdBy.36dd0@example.org",
            "modifiedAt": "2011-02-08T02:00:00.000Z",
            "modifiedBy": "modifiedBy.36dd0@example.com"
        },
        {
            "ID": "5336101d-ef1c-46f1-88df-9924f3c7b78d",
            "createdAt": "2019-09-04T02:00:00.000Z",
            "createdBy": "createdBy.36dd1@example.net",
            "modifiedAt": "2002-04-08T02:00:00.000Z",
            "modifiedBy": "modifiedBy.36dd1@example.net"
        },
        {
            "ID": "53361027-5e84-438d-a12e-2d20ae0dd43a",
            "createdAt": "2003-01-23T02:00:00.000Z",
            "createdBy": "createdBy.36dd2@example.com",
            "modifiedAt": "2015-07-02T02:00:00.000Z",
            "modifiedBy": "modifiedBy.36dd2@example.org"
        },
    ])
}
```

💡 **Por padrão o CAP cria os mocks do diretório data dentro da pasta db, porém como os dados são de testes, colocamos na pasta test. Quando os dados são reais, o correto é deixar dentro de db.**

Comando: `cds add data --records 10 --out test/data`
Arquivo gerado:

``` CSV
ID,createdAt,createdBy,modifiedAt,modifiedBy

5336100b-bb59-4b32-8331-69179f5b74e5,2008-12-09T02:00:00.000Z,createdBy.36dd0@example.org,2011-02-08T02:00:00.000Z,modifiedBy.36dd0@example.com

5336101d-ef1c-46f1-88df-9924f3c7b78d,2019-09-04T02:00:00.000Z,createdBy.36dd1@example.net,2002-04-08T02:00:00.000Z,modifiedBy.36dd1@example.net

53361027-5e84-438d-a12e-2d20ae0dd43a,2003-01-23T02:00:00.000Z,createdBy.36dd2@example.com,2015-07-02T02:00:00.000Z,modifiedBy.36dd2@example.org

5336103d-dd1a-4c7e-bb2b-e39453db9838,2009-07-14T02:00:00.000Z,createdBy.36dd3@example.net,2013-01-03T02:00:00.000Z,modifiedBy.36dd3@example.org

53361047-036d-4c48-a1ad-a3ab3e588256,2011-04-02T02:00:00.000Z,createdBy.36dd4@example.net,2017-10-11T02:00:00.000Z,modifiedBy.36dd4@example.org

5336105e-2652-458b-b262-9652e3d580c4,2018-09-28T02:00:00.000Z,createdBy.36dd5@example.net,2020-11-26T02:00:00.000Z,modifiedBy.36dd5@example.net

53361060-484c-4924-89c4-e8ba24e5572d,2013-06-14T02:00:00.000Z,createdBy.36dd6@example.org,2023-10-11T02:00:00.000Z,modifiedBy.36dd6@example.org

53361072-0819-4f60-bfe4-28088023af27,2004-06-28T02:00:00.000Z,createdBy.36dd7@example.org,2006-12-11T02:00:00.000Z,modifiedBy.36dd7@example.com

5336108c-906c-4b37-abba-f249a6b36fcb,2013-03-09T02:00:00.000Z,createdBy.36dd8@example.com,2010-05-12T02:00:00.000Z,modifiedBy.36dd8@example.com

5336109d-cd85-465b-809a-f562fea9a125,2011-10-24T02:00:00.000Z,createdBy.36dd9@example.net,2002-01-09T02:00:00.000Z,modifiedBy.36dd9@example.net
```

## Extra docs

[Using cds add data](https://cap.cloud.sap/docs/guides/databases/initial-data#using-cds-add-data)