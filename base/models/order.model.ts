export interface OrderModel {
    id?: string;
    code?: string;
    createdAt?: string;
    customerId?: string;
    totalPrice: number;
    products: ProductOrderModel[]

}

export interface ProductOrderModel {
    id: string,
    image: string,
    name: string,
    price: number,
    quantity: number,
    classify: any
}