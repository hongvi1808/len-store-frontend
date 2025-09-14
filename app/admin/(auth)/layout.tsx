import type { Metadata } from "next";
import { LayoutAdmin } from "@/components/layouts/adminLayout/layout-admin.comp";
import { CalendarDaysIcon, ChartBarIcon, ListBulletIcon, TableCellsIcon, } from "@heroicons/react/16/solid";


export const metadata: Metadata = {
    title: "Admin LenStore",
    description: "Hệ thống bán hàng LenStore",
};
const menu = [{
  text: 'Dashboard',
  href: '/admin/dashboard',
  icon: <ChartBarIcon  />,
},
{
  text: 'Category',
  href: '/admin/category',
  icon: <ListBulletIcon  />,
},
{
  text: 'Product',
  href: '/admin/product',
  icon: <TableCellsIcon  />,
},
{
  text: 'Order',
  href: '/admin/order',
  icon: <CalendarDaysIcon  />,
},
]
export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutAdmin menu={menu}>
      {children}
    </LayoutAdmin>
  );
}
