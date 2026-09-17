// entity SalesOrderHeaders : managed {
//     key ID          : UUID;
//         customer    : Association to Customers;
//         items       : Composition of many SalesOrderItems
//                           on items.header = $self;
//         totalAmount : Decimal(15, 2);
// }

import { SalesOrderItemModel } from "./sales-order-item";

type SalesOrderHeaderProps = {
    ID: string,
    customer_ID: string,
    items: SalesOrderItemModel[],
    totalAmount: number
};

type CreationPayload = {
    customer_ID: SalesOrderHeaderProps['customer_ID'];
};

type ProductDataResponse = {
    ID: string;
    quantity: number;
}

export type CreationPaylaodValidationResult = {
    hasError: boolean;
    errorMessage?: Error;
    totalAmount?: number
};

export class SalesOrderHeaderModel {
    constructor(private props: SalesOrderHeaderProps) { };

    public static create(props: Omit<SalesOrderHeaderProps, 'totalAmount'>): SalesOrderHeaderModel {
        return new SalesOrderHeaderModel({ ...props, totalAmount: 0 });
    }

    public get ID() {
        return this.props.ID;
    }

    public get customer_ID() {
        return this.props.customer_ID;
    }

    public get items() {
        return this.props.items;
    }

    // private set totalAmount(value: number) {
    //     this.totalAmount = value;
    // }

    public validateInputPayload(params: CreationPayload): CreationPaylaodValidationResult {
        if (!params.customer_ID) {
            return { hasError: true, errorMessage: new Error("Customer ID is required") };
        }
        if (!this.items || this.items?.length === 0) {
            return { hasError: true, errorMessage: new Error("At least one Item is necessary") };
        }

        const itemsValidationMessages: string[] = [];
        this.items.forEach(item => {
            const validationResult = item.validateInputPayload({ product_ID: item.podruct_ID });

            if (validationResult.hasError === true) {
                itemsValidationMessages.push(validationResult.errorMessage?.message as string);
            }
        });

        if (itemsValidationMessages.length > 0) {
            const message: string = itemsValidationMessages.join('/n - ');

            return {
                hasError: true,
                errorMessage: new Error(message)
            }
        }

        return {
            hasError: false
        }

    }

    public calculateTotalAmount() {
        let totalAmountValue = 0;
        this.items.forEach(item => {
            totalAmountValue += (item.price as number) * (item.quantity as number);
        });

        // this.totalAmount = this.calculateDiscount(totalAmountValue);
        return this.calculateDiscount(totalAmountValue);
    }

    private calculateDiscount(totalAmount: number): number {
        if (totalAmount > 30000) {
            const discount = totalAmount * (10 / 100);
            return totalAmount - discount;
        } else {
            return totalAmount;
        }
    }

    public getProductData(): ProductDataResponse[] {
        return this.items.map(item => {
            return {
                ID: item.ID,
                quantity: item.quantity
            }
        });
    }
}