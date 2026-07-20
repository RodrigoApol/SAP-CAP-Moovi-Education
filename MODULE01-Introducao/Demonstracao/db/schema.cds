namespace cap.schema;

@assert.unique: {email: [email]}

entity User {
    key ID        : UUID;

        @assert.format        : '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
        @assert.format.message: 'E-mail inválido. Por favor, insira um e-mail válido.'
        email     : String(100);
        firstName : String(100);
        lastName  : String(100);
}
