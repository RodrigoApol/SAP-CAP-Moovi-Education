type SalesOrderLogsProps = {
    ID: string;
    header_ID: string;
    userData: string;
    orderData: string;
};

export class SalesOrderLogsModel {
    constructor(private props: SalesOrderLogsProps) {}

    public static create(props: Omit<SalesOrderLogsProps, "ID">) {
        return new SalesOrderLogsModel({ ...props, ID: crypto.randomUUID() });
    }

    public get ID() {
        return this.props.ID;
    }

    public get header_ID() {
        return this.props.header_ID;
    }

    public get userData() {
        return this.props.userData;
    }

    public get orderData() {
        return this.props.orderData;
    }

    public toObject(): SalesOrderLogsProps {
        return {
            ID: this.ID,
            header_ID: this.header_ID,
            userData: this.userData,
            orderData: this.orderData
        };
    }
}
