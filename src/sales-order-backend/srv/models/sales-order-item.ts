// entity SalesOrderItems : managed {
//     key ID       : UUID;
//         header   : Association to SalesOrderHeaders;
//         product  : Association to Products;
//         quantity : Integer;
//         price    : Decimal(15, 2);
// }

import { ProductModel } from "./products";

type SalesOrderItemProps = {
    ID: string;
    product_ID: string;
    quantity: number;
    price: number;
    producs: ProductModel[]
}

type CreationPayload = {
    product_ID: SalesOrderItemProps['product_ID'];
};

type CreationPaylaodValidationResult = {
    hasError: boolean;
    errorMessage?: Error;
};

class SalesOrderItemModel {
    constructor(private props: SalesOrderItemProps) { }

    public get ID() {
        return this.props.ID;
    }

    public get podruct_ID() {
        return this.props.product_ID;
    }

    public get quantity() {
        return this.props.quantity;
    }

    public get price() {
        return this.props.price;
    }

    public validateInputPayload(params: CreationPayload): CreationPaylaodValidationResult {
        const product = this.props.producs.find(p => p.ID === params.product_ID);

        if (!product) {
            return {
                hasError: true,
                errorMessage: new Error(`Product ${params.product_ID} not found`)
            }
        } else if (product.stock === 0) {
            return {
                hasError: true,
                errorMessage: new Error(`No stock available for product ${product.name}(${product.ID})`)
            }
        } else {
            return {
                hasError: false
            }
        }
    }
}