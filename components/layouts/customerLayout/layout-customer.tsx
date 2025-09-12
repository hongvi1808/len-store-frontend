'use client'

import { Box,  } from "@mui/material"
import Appbar from "./appbar.comp";
import Footer from "./footer.comp";

export function LayoutCustomer({
    children,
    menu
}: {
    children: React.ReactNode;
    menu: any
}) {

    return <Box >
        <Appbar menu={menu} />
       
        {children}
        <Footer/>
    </Box>

}