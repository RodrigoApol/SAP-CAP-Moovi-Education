import cds, { Service, Request } from "@sap/cds";
import { Customer, Customers, Product, Products, SalesOrderHeaders, SalesOrderItem, SalesOrderItems } from "#cds-models/sales"

export default (srv: Service) => {
    srv.after("READ", "Customers", (result: Customers) => {
        result.forEach(customer => {
            if (!customer.email?.includes("@")) {
                customer.email = `${customer.email}@example.com`;
            }
        })
    });

    srv.before("CREATE", "SalesOrderHeaders", async (request: Request) => {
        const params = request.data;
        console.log(params)

        if (!params.customer_ID) {
            return request.reject(400, "Customer ID is required");
        };

        if (!params.items || params.items?.length === 0) {
            return request.reject(400, "At least one Item is necessary");
        }

        const customerQuery = SELECT.one.from(Customers).where({ ID: params.customer_ID });
        const customerResult: Customer = await cds.run(customerQuery);

        if (!customerResult) {
            return request.reject(404, `Customer with ID: ${params.customer_ID} not found`)
        }

        // Agrupa todos produtos (ID) na ordem de vendas
        const items: SalesOrderItems = params.items;
        const productIds = items.map((item: SalesOrderItem) => item.product_ID);

        const productsQuery = SELECT.from(Products).where({ ID: productIds });
        const products: Products = await cds.run(productsQuery);

        // Regras para validar existência e estoque do produto
        for (const item of items) {
            const productDb = products.find((product: Product) => product.ID === item.product_ID);

            if (!productDb) {
                request.reject(404, `Product ${item.product_ID} not found`);
            }
            if (productDb.stock === 0) {
                request.reject(400, `No stock available for product ${productDb.name}(${productDb.ID})`);
            }
        }
    });

    srv.after("CREATE", "SalesOrderHeaders", async (results: SalesOrderHeaders, request: Request) => {
        // Garante que o retorno sempre será um Array
        // const headers = Array.isArray(results) ? results : [results] as SalesOrderHeaders;

        const header = request.data;

        const items = header.items as SalesOrderItems;
        console.log(`Funcionando até aqui `, items);

        const productsData = items.map(item => ({
            ID: item.product_ID as string,
            quantity: item.quantity as number
        }));

        console.log(productsData);
        // for (const header of headers) {
        //     const items = header.items as SalesOrderItems;
        //     const productsData = items.map(item => ({
        //         ID: item.product_ID as string,
        //         quantity: item.quantity as number
        //     }));
        // }

        const productIds = productsData.map((productData) => productData.ID);
        const productsQuery = SELECT.from(Products).where({ ID: productIds });
        const products: Products = await cds.run(productsQuery);

        for (const productData of productsData) {
            const foundProduct = products.find(product => product.ID === productData.ID) as Product;
            foundProduct.stock = (foundProduct.stock as number) - productData.quantity;
            const updateQuery = UPDATE(Product).set({ stock: foundProduct.stock }).where({ ID: foundProduct.ID });
            await cds.run(updateQuery);

            console.log(`estoque atualizado: ${foundProduct.stock}`);
        }
    });
}