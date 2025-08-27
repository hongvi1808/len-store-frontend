'use client'

import { Box, Icon, Toolbar, useMediaQuery, useTheme, } from "@mui/material"
import { useState } from "react";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import Appbar from "./appbar.comp";
import Footer from "./footer.comp";

export function LayoutCustomer({
    children,
    menu
}: {
    children: React.ReactNode;
    menu: any
}) {

    const theme = useTheme();
    const isOverSmViewport = useMediaQuery(theme.breakpoints.up('sm'));

    const [open, setOpen] = useState(true);

    return <Box >
        <Appbar menu={menu} />
        <Box minHeight={500}>
            <Toolbar sx={{ displayPrint: 'none' }} />
            {children}
        </Box>
        <Footer />
    </Box>

}