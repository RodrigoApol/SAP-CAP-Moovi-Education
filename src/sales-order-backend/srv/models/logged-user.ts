type LoggedUserProps = {
    id: string;
    roles: string[]
}

export class LoggedUserModel {
    constructor(private props: LoggedUserProps) { }

    public static create(props: LoggedUserProps): LoggedUserModel {
        return new LoggedUserModel(props);
    }

    public get id() {
        return this.props.id;
    }

    public get roles() {
        return this.props.roles;
    }
}