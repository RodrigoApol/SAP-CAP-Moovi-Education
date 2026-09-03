import { ProductModel, ProductProps } from "../../models/products";

export interface ProductsRepository {
    findByIds(ids: ProductProps['ID'][]): Promise<ProductModel[]>;
}