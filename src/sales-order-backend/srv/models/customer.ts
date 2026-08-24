// entity Customers : managed {
//     key ID        : UUID;
//         firstName : String(100);
//         lastName  : String(100);
//         email     : String(100);
// }

type CustomerProps = {
    ID: string,
    firstName: string,
    lastName: string,
    email: string
}

export class CustomerModel {
    constructor(private props: CustomerProps) { }

    public get ID() {
        return this.props.ID;
    }

    public get firstName() {
        return this.props.firstName;
    }

    public get lastName() {
        return this.props.lastName;
    }

    public get email() {
        return this.props.email;
    }

    public static create(props: CustomerProps): CustomerModel {
        return new CustomerModel(props);
    }

    public setDefaultEmailDomain() {
        if (!this.props.email?.includes("@")) {
            this.props.email = `${this.props.email}@email.com`
        }

        return this;
    }

    public toObject(): CustomerProps {
        return {
            ID: this.props.ID,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email,
        }
    }
}