'use client'

import { Badge, Box, Drawer, IconButton, Stack, Toolbar, Tooltip } from "@mui/material"
import { usePathname, useRouter } from "next/navigation";
import { HomeIcon, ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { HomeIcon as SoildHomeIcon, ShoppingBagIcon as SoildShoppingBagIcon, ShoppingCartIcon as SoildSoildShoppingBagIcon } from "@heroicons/react/24/solid";
import { brand } from "@/base/ui/themePrimitive";
import { useSelector } from "react-redux";
import { RootState } from "@/base/store";


type MenuType = { text: string; href: string; outlineIcon: any, solidIcon: any, badge?: boolean }
const menus: MenuType[] = [
    {
        text: 'Trang chủ',
        outlineIcon: <HomeIcon height={26} width={26} />,
        solidIcon: <SoildHomeIcon height={26} width={26} />,
        href: '/'
    },
    {
        text: 'Giỏ hàng',
        outlineIcon: <ShoppingCartIcon height={26} width={26} />,
        solidIcon: <SoildShoppingBagIcon height={26} width={26} />,
        href: '/cart',
        badge: true,
    },
    {
        text: 'Đơn hàng',
        outlineIcon: <ShoppingBagIcon height={26} width={26} />,
        solidIcon: <SoildSoildShoppingBagIcon height={26} width={26} />,
        href: '/order',
        badge: true,
    },
]


export interface LeftToolBarProps {
    isOverSmViewport: boolean
    open: boolean;
}
export function LeftToolBar(props: LeftToolBarProps) {
    const router = useRouter()
    const pathname = usePathname();
    const { products : cartItems } = useSelector((state: RootState) => state.cartLocal)
    const { products: orderItems, status } = useSelector((state: RootState) => state.order)
    const getBadgeContent = (href: string) => {
        switch (href) {
            case '/cart':return cartItems?.length
            case '/order':{
                if (status === 'Pending')
                return orderItems?.length
            return undefined
            }
        
            default: return ;
        }
    }

    return <Drawer
        variant={props.isOverSmViewport ? 'permanent' : 'temporary'}
        open={props.open}
        PaperProps={{
            sx: {
                boxShadow: "none",
                border: "none",
            },
        }}
    >
        {props.open && <Box >
            <Toolbar />
            <Stack spacing={1.5} mt={2} width={80} alignItems={'center'} >
                {menus?.map((item, index) => (

                    <Tooltip key={index} title={item.text} placement="right">
                        <IconButton
                            onClick={() => router.push(item.href)} size="large" sx={{
                                border: 'none',
                                borderRadius: 2,
                                background: pathname === item.href ? brand[50] : 'transparent',
                            }}>
                            <Badge badgeContent={getBadgeContent(item.href)} invisible={!item.badge} color="error">
                                {pathname === item.href ? item.solidIcon : item.outlineIcon}
                            </Badge>
                        </IconButton>
                    </Tooltip>
                ))}
            </Stack></Box>}

    </Drawer>

}