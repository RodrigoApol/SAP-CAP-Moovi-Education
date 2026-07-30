# OData V4 Principais Conceitos

- O OData V4 (Open Data Protocol) é um protocolo padrão para criação e consumo de APIs RESTful
- Permite consultas dinâmicas e operações CRUD de maneira padronizada
- Expõe um documento XML que descreve o modelo de dados e os endpoints disponíveis usando o parâmetro `$metadata`
- Query Options (Filters, Order By, Pagination...)
- Permite requisições HTTP em Batch (Várias requisições em uma única chamada)
## OData no CAP

- Exposição automática de APIs
- Manipulação de Dados com Query Options
- **Actions** e **Functions** personalizadas
- Integração com SAP S/4HANA
- Validações e Autorizações

## Principais Query Options

### `$select`

Query option usada para selecionar campos específicos dos registros, para serem exibidos.

`http://{{Server}}/odata/v4/main/{{Entity}}?$select=firstName,lastName,email

Nesse exemplo apenas os campos `firstName`, `lastName`, e `email` irão retornar na resposta
### `$filter`

Usamos quando queremos achar valores específicos em determinados campos e registros.

`http://{{Server}}/odata/v4/main/{{Entity}}?$filter=firstName eq 'Rodrigo'`

O exemplo acima só irá retornar o registro onde o campo `fistName` é igual a **Rodrigo**

### `$expand`

Serve para "acessar" entidades internas de outra.

`http://{{Server}}/odata/v4/main/Order(ID={{id}})?$expand=items`

Nesse exemplo usamos o parâmetro para exibir os dados de `items` que tem um relacionamento de filho com a entidade `Order`. 

Sem o `$expand` o registro só irá retornar o seguinte JSON:
``` JSON
{ 
	"@odata.context": "$metadata#SalesOrderHeaders/$entity", 
	"createdAt": "2026-07-29T19:33:59.168Z", 
	"createdBy": "anonymous", 
	"modifiedAt": "2026-07-29T19:33:59.168Z", 
	"modifiedBy": "anonymous", 
	"ID": "4d9ab65c-7c09-428b-bf29-703db8eea52f", 
	"customer_ID": "196aaff8-af74-465e-8f9b-9c03eb4317a9", 
	"totalAmount": "5000.00" 
}
```

Com o `$expand`:
``` JSON
{ 
	"@odata.context": "$metadata#SalesOrderHeaders/$entity", 
	"createdAt": "2026-07-29T19:33:59.168Z", 
	"createdBy": "anonymous", 
	"modifiedAt": "2026-07-29T19:33:59.168Z", 
	"modifiedBy": "anonymous", 
	"ID": "4d9ab65c-7c09-428b-bf29-703db8eea52f", 
	"customer_ID": "196aaff8-af74-465e-8f9b-9c03eb4317a9", 
	"totalAmount": "5000.00", 
	"items": [ 
		{ 
			"createdAt": "2026-07-29T19:33:59.168Z", 
			"createdBy": "anonymous", 
			"modifiedAt": "2026-07-29T19:33:59.168Z", 
			"modifiedBy": "anonymous", 
			"ID": "fd611ae0-7f7d-42eb-8591-39f3a7e96cde", 
			"order_ID": "4d9ab65c-7c09-428b-bf29-703db8eea52f", 
			"product_ID": "800fafc9-c69b-4134-b4c9-1f3ceb104a8b", 
			"quantity": 10, 
			"price": "5000.00" 
		} 
	] 
}
```

### `$count`, `$skip` e `$top`

Query options usadas para trabalhar com paginação de registros.

`http://{{Server}}/odata/v4/main/{{Entity}}/$count`

Com o parâmetro `$count` obtemos o número total de registros, por exemplo se a API tiver 10 registros então retornará o número **10**. Simples!

`http://{{Server}}/odata/v4/main/{{Entity}}?$skip=5&$top=5`

No exemplo acima usamos o parâmetro `$skip` para "pular" os 5 primeiros registros, e `$top` para definir o máximo de registros que serão exibidos.

### `$orderby`

Usamos o `$orderby` para ordenação/exibição dos registros para o cliente, usando algum campo dos registros como parâmetro.

`http://{{Server}}/odata/v4/main/{{Entity}}?$orderby=firstName desc`

No exemplo acima ordenamos os registros de maneira decrescente (usando o complemento `desc`, por padrão `asc`).
## Extra docs

[OData V4 Documentation](https://www.odata.org/documentation/)
[OData URL Conventions](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#_Toc31360968)