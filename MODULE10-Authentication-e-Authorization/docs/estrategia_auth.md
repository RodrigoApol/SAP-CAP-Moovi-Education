# Estratégia de Autenticação e Autorização

## Configuração no arquivo .cdsrc.json

``` JSON
{
    "cds": {
        "[development]": {
            "requires": {
                "auth": {
                    "kind": "basic",
                    "users": {
                        "admin": {
                            "password": "master",
                            "roles": [
                                "admin"
                            ]
                        }
                    }
                }
            }
        }
    }
}
```

## Acessando configurações via terminal

``` Shell
cds env get requires.auth
```

Resultado:
``` JSON
{
  kind: 'basic',
  users: {
    admin: { password: 'master', roles: [ 'admin' ] },
  },
  tenants: {}
}
```