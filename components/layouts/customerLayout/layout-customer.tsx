'use client'

import { Box, Icon, Toolbar, useMediaQuery, useTheme, } from "@mui/material"
import { useState } from "react";
import { BuildingStorefrontIcon, HomeIcon } from "@heroicons/react/24/solid";
import Appbar, { StyledToolbar } from "./appbar.comp";
import Footer from "./footer.comp";
import { LeftToolBar } from "./left-tool-bar.comp";

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
        <Appbar menu={menu}  open={open} onToggleLeftTool={(op) => setOpen(op)} />
         <LeftToolBar open={open} isOverSmViewport={isOverSmViewport} />
        
        <Box marginLeft={ isOverSmViewport ? open ? '80px' : 0 : 0} padding={2} minHeight={500}>
            <Toolbar sx={{ displayPrint: 'none' }} />
            {children}
        </Box>
        {/* <Footer /> */}
    </Box>

}