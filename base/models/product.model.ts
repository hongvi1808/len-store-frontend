export interface ProductModel {
    id: string;
    name: string;
    slug?: string;
    stock: number;
    price: number;
    description: string;
    categoryIds: string[]

}