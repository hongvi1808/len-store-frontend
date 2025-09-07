'use client'

import { Box, Container, Toolbar, } from "@mui/material"
import Appbar from "./appbar.comp";

export function LayoutCustomer({
    children,
    menu
}: {
    children: React.ReactNode;
    menu: any
}) {

    return <Box >
        <Appbar menu={menu}  />
        
            <Toolbar sx={{ displayPrint: 'none' }} />
        <Container >
            {children}
        </Container>
    </Box>

}