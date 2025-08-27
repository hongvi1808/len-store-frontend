export interface OrderModel {
    id?: string;
    code?: string;
    createdAt?: string;
    customerId?: string;
    totalPrice: number;
    products: {id: string, name: string, price: number, quantity: number}[]

}