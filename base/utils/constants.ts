import { OrderStatus } from "./config";

export const SESSION_LOCAL_STORAGE_KEY = 'session'
export const CART_LOCAL_STORAGE_KEY = 'cartLocal'
export const ORDER_LOCAL_STORAGE_KEY = 'order'
export const CLD_UPLOAD_PRESET_NAME = 'images'

export const ROLE_ADMIN = 'Admin';
export const ROLE_CUSTOMER = 'Customer';
export const ROLE_SELLER = 'Seller';
export const TAGS_CATEGORY = [
    'handmade',
    'wool',
    'tool',
    'material',
    'combo',
    'promotion',
    'other',];


export const orderStatusText = new Map([
    [OrderStatus.Pending, 'Đã đặt hàng'],
    [OrderStatus.Paid, 'Đã thanh toán'],
    [OrderStatus.Shipping, 'Đang giao hàng'],
    [OrderStatus.Shipped, 'Giao hàng thành công'],
    [OrderStatus.Completed, 'Hoàn thành'],
    [OrderStatus.Cancelled, 'Đã hủy'],
])
