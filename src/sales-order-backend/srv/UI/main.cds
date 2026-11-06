using {MainService as ms} from '../routes/main-service';

annotate ms.SalesOrderHeaders with @(
    Capabilities: {
        DeleteRestrictions: {
            $Type    : 'Capabilities.DeleteRestrictionsType',
            Deletable: false
        },
        FilterRestrictions: {
            $Type                       : 'Capabilities.FilterRestrictionsType',
            FilterExpressionRestrictions: [
                {
                    Property          : createdAt,
                    AllowedExpressions: 'SingleRange'
                },
                {
                    Property          : modifiedAt,
                    AllowedExpressions: 'SingleRange'
                }
            ]
        }
    },
    UI          : {
        SelectionFields   : [
            ID,
            totalAmount,
            customer_ID,
            status_ID,
            createdAt,
            modifiedAt
        ],
        LineItem          : [
            {
                $Type             : 'UI.DataField',
                @HTML5.CssDefaults: {
                    $Type: 'HTML5.CssDefaultsType',
                    width: '20%'
                },
                Value             : ID
            },
            {
                $Type             : 'UI.DataField',
                @HTML5.CssDefaults: {
                    $Type: 'HTML5.CssDefaultsType',
                    width: '10%'
                },
                Value             : totalAmount
            },
            {
                $Type             : 'UI.DataField',
                @HTML5.CssDefaults: {
                    $Type: 'HTML5.CssDefaultsType',
                    width: '20%'
                },
                Value             : createdAt
            },
            {
                $Type             : 'UI.DataField',
                @HTML5.CssDefaults: {
                    $Type: 'HTML5.CssDefaultsType',
                    width: '5%',
                },
                Value             : customer.firstName
            },
            {
                $Type                    : 'UI.DataField',
                Criticality              : (status.ID = 'REJECTED' ? 1 : (status.ID = 'PENDING' ? 2 : 3)),
                CriticalityRepresentation: #WithoutIcon,
                @HTML5.CssDefaults       : {
                    $Type: 'HTML5.CssDefaultsType',
                    width: '10%',
                },
                Value                    : status_ID
            }
        ],
        HeaderInfo        : {
            $Type         : 'UI.HeaderInfoType',
            TypeName      : 'Pedido',
            TypeNamePlural: 'Pedidos',
            Title         : {
                $Type: 'UI.DataField',
                Value: 'Pedido: {ID}'
            },
        },
        Facets            : [
            {
                ID    : 'salesOrderData',
                $Type : 'UI.CollectionFacet',
                Label : 'Informações do Cabeçalho do Pedido',
                Facets: [{
                    ID    : 'header',
                    $Type : 'UI.ReferenceFacet',
                    Target: '@UI.FieldGroup#Header'
                }]
            },
            {
                ID    : 'customerData',
                $Type : 'UI.ReferenceFacet',
                Label : 'Informações do Cliente',
                Target: 'customer/@UI.FieldGroup#Customers'
            },
            {
                ID    : 'itemsData',
                $Type : 'UI.ReferenceFacet',
                Label : 'Itens',
                Target: 'items/@UI.LineItem#Items'
            }
        ],
        FieldGroup #Header: {
            $Type: 'UI.FieldGroupType',
            Data : [
                {
                    $Type: 'UI.DataField',
                    Value: ID
                },
                {
                    $Type: 'UI.DataField',
                    Value: totalAmount
                },
                {
                    $Type: 'UI.DataField',
                    Value: createdAt
                },
                {
                    $Type: 'UI.DataField',
                    Value: createdBy
                }
            ]
        },
    }
) {
    @title: 'Código'
    ID;
    @title: 'Valor Total'
    totalAmount;
    @(
        title : 'Cliente',
        Common: {
            Label          : 'Cliente',
            Text           : customer.firstName,
            TextArrangement: #TextOnly,
            ValueList      : {
                $Type         : 'Common.ValueListType',
                CollectionPath: 'Customers',
                Parameters    : [
                    {
                        $Type            : 'Common.ValueListParameterInOut',
                        ValueListProperty: 'ID',
                        LocalDataProperty: 'customer_ID'
                    },
                    {
                        $Type            : 'Common.ValueListParameterDisplayOnly',
                        ValueListProperty: 'firstName',
                    },
                    {
                        $Type            : 'Common.ValueListParameterInOut',
                        ValueListProperty: 'lastName',
                    },
                    {
                        $Type            : 'Common.ValueListParameterInOut',
                        ValueListProperty: 'email',
                    },
                ]
            },
        }
    )
    customer;
    @(
        title : 'Status',
        Common: {
            Label          : 'Status',
            Text           : status.description,
            TextArrangement: #TextOnly,
            ValueListWithFixedValues,
            ValueList      : {
                $Type         : 'Common.ValueListType',
                CollectionPath: 'SalesOrderStatuses',
                Parameters    : [{
                    $Type            : 'Common.ValueListParameterInOut',
                    ValueListProperty: 'ID',
                    LocalDataProperty: 'status_ID'
                }, ]
            },
        }
    )
    status;
    @UI.HiddenFilter: false
    @title          : 'Data de Criação'
    createdAt;
    @title: 'Criado Por'
    createdBy;
    @UI.HiddenFilter: false
    @title          : 'Data de Modificação'
    modifiedAt;
    @title: 'Atualizado Por'
    modifiedBy;
};

annotate ms.SalesOrderStatuses with {
    @Common.Text           : description
    @Common.TextArrangement: #TextOnly
    ID;
};

annotate ms.Customers with @(UI: {FieldGroup #Customers: {
    $Type: 'UI.FieldGroupType',
    Data : [
        {
            $Type: 'UI.DataField',
            Value: ID
        },
        {
            $Type: 'UI.DataField',
            Value: firstName
        },
        {
            $Type: 'UI.DataField',
            Value: lastName
        },
        {
            $Type: 'UI.DataField',
            Value: email
        },
    ]
}, }) {
    ID        @title: 'Código';
    firstName @title: 'Nome';
    lastName  @title: 'Sobrenome';
    email     @title: 'E-Mail'
}

annotate ms.SalesOrderItems with @(UI: {LineItem #Items: [
    {
        $Type             : 'UI.DataField',
        @HTML5.CssDefaults: {
            $Type: 'HTML5.CssDefaultsType',
            width: '20%'
        },
        Value             : ID
    },
    {
        $Type: 'UI.DataField',
        Label: 'Identificação Produto',
        Value: product.name
    },
    {
        $Type: 'UI.DataField',
        Value: quantity
    },
    {
        $Type             : 'UI.DataField',
        @HTML5.CssDefaults: {
            $Type: 'HTML5.CssDefaultsType',
            width: '20%'
        },
        Value             : price
    },
], }) {
    ID         @title: 'Código';
    price      @title: 'Preço';
    quantity   @title: 'Qtd.';
    createdAt  @UI.Hidden;
    createdBy  @UI.Hidden;
    modifiedAt @UI.Hidden;
    modifiedBy @UI.Hidden;
    product    @UI.Hidden;
    header     @UI.Hidden;
};
