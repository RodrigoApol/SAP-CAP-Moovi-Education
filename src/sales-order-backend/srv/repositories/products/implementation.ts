import cds from "@sap/cds";

import { Products } from "#cds-models/sales";
import { ProductsRepository } from "./interface";
import { ProductModel, ProductProps } from "../../models/products";


export class ProductsRepositoryImpl implements ProductsRepository {
    public async findByIds(ids: ProductProps["ID"][]): Promise<ProductModel[] | null> {
        const productsQuery = SELECT.from(Products).where({ ID: ids });
        const products: Products = await cds.run(productsQuery);

        return products.map(p => {
            const props = {
                ID: p.ID as string,
                name: p.name as string,
                price: p.price as number,
                stock: p.stock as number
            };

            return ProductModel.create(props);
        });
    }

    public async updateStock(product: ProductModel): Promise<void> {
        const query = UPDATE(Products)
            .set({ stock: product.stock })
            .where({ ID: product.ID });

        await cds.run(query);
    }

}
