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
};

export class ProductModel {
    constructor(private props: ProductProps) {}

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

    private set stock(stock: number) {
        this.props.stock = stock;
    }

    public sell(amount: number): { hasError: boolean; errorMessage?: Error; quantityAvailable?: number } {
        if (this.stock < amount) {
            return {
                hasError: true,
                errorMessage: new Error("Quantity in stock isn't enough"),
                quantityAvailable: this.stock
            };
        }
        this.stock = amount;
        return {
            hasError: false,
            quantityAvailable: this.stock
        };
    }
}
