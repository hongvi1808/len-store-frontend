'use client'

import { Badge, Box, Drawer, IconButton, Stack, Toolbar, Tooltip } from "@mui/material"
import { usePathname, useRouter } from "next/navigation";
import { HomeIcon, ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { HomeIcon as SoildHomeIcon, ShoppingBagIcon as SoildShoppingBagIcon, ShoppingCartIcon as SoildSoildShoppingBagIcon } from "@heroicons/react/24/solid";
import { brand } from "@/base/ui/themePrimitive";
import { getCartLocal } from "@/base/utils/func";


type MenuType = { text: string; href: string; outlineIcon: any, solidIcon: any }
const menus: MenuType[] = [
    { text: 'Trang chủ', outlineIcon: <HomeIcon height={26} width={26} />, solidIcon: <SoildHomeIcon height={26} width={26} />, href: '/' },
    { text: 'Giỏ hàng', outlineIcon: <ShoppingCartIcon height={26} width={26} />, solidIcon: <SoildShoppingBagIcon height={26} width={26} />, href: '/cart' },
    { text: 'Đơn hàng', outlineIcon: <ShoppingBagIcon height={26} width={26} />, solidIcon: <SoildSoildShoppingBagIcon height={26} width={26} />, href: '/orders' },
]


export interface LeftToolBarProps {
    isOverSmViewport: boolean
    open: boolean;
}
export function LeftToolBar(props: LeftToolBarProps) {
    const router = useRouter()
    const pathname = usePathname();


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
                            <Badge badgeContent={getCartLocal()?.length} invisible={item.href !== '/cart' || !getCartLocal()?.length} color="error">
                                {pathname === item.href ? item.solidIcon : item.outlineIcon}
                            </Badge>
                        </IconButton>
                    </Tooltip>
                ))}
            </Stack></Box>}

    </Drawer>

}