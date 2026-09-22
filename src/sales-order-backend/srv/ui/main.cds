using {MainService as ms} from '../routes/main-service';

annotate ms.SalesOrderHeaders with @(UI: {
    SelectionFields: [
        ID,
        totalAmount,
        customer_ID,
        createdAt,
        modifiedAt
    ],
    LineItem       : [
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
            Label             : 'Cliente',
            @HTML5.CssDefaults: {
                $Type: 'HTML5.CssDefaultsType',
                width: '5%',
            },
            Value             : customer.firstName
        }
    ],
}) {
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
