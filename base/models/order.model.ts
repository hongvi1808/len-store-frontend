import { OrderStatus } from "../utils/config";

export interface OrderModel {
    id?: string;
    code?: string;
    createdAt?: number;
    customerId?: string;
    totalPrice: number;
    status: OrderStatus
    orderItems: ProductOrderModel[]

}

export interface ProductOrderModel {
    id: string,
    image: string,
    name: string,
    price: number,
    quantity: number,
    product?: {images: any | null}
    classify: any
}