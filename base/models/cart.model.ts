import { ProductModel } from "./product.model";

export interface CartItemModel {
    id?: string;
    quantity: number;
    classify?: any;
    product: ProductModel
    // image?: string
    // productId: string;
    // name: string;
    // price: number;
    // stock?:number
}