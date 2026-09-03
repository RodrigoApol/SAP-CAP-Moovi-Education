import cds from "@sap/cds";

import { Products } from "#cds-models/sales";
import { ProductProps, ProductModel } from "../../models/products";
import { ProductsRepository } from "./interface";

export class ProductsRepositoryImpl implements ProductsRepository {
    public async findByIds(ids: ProductProps["ID"][]): Promise<ProductModel[]> {
        const productsQuery = SELECT.from(Products).where({ ID: ids });
        const products: Products = await cds.run(productsQuery);

        return products.map(p => {
            const props = {
                ID: p.ID as string,
                name: p.name as string,
                price: p.price as number,
                stock: p.stock as number
            }

            return ProductModel.create(props)
        })
    }

}