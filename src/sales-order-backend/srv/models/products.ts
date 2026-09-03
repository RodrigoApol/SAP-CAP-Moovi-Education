// entity Products : managed {
//     key ID    : UUID;
//         name  : String(100);
//         price : Decimal(15, 2);
//         stock : Integer;
// }

export type ProductProps = {
    ID: string;
    name: string;
    price: number;
    stock: number;
}

export class ProductModel {
    constructor(private props: ProductProps) { }

    public static create(props: ProductProps): ProductModel {
        return new ProductModel(props);
    }

    public get ID() {
        return this.props.ID;
    }

    public get name() {
        return this.props.name;
    }

    public get price() {
        return this.props.price;
    }

    public get stock() {
        return this.props.stock;
    }
}