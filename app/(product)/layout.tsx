import type { Metadata } from "next";
import { LayoutCustomer } from "@/components/layouts/customerLayout/layout-customer";

export const metadata: Metadata = {
    title: "Cửa hàng LenStore - Sản phẩm thủ công từ len",
    description: "Trang chủ LenStore",
};
const menu = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Sản phẩm', href: '/handmade/all' },
    { title: 'Blog', href: '/blog' },
    { title: 'Liên hệ', href: '/contact' },
]
export default function CustomerRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <LayoutCustomer menu={menu}>
            {children}
        </LayoutCustomer>
    );
}
