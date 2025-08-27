import { Box } from "@mui/material";
import { ProductListByTagComp } from "./product-list";

export default async function ProductByTagPage({ params }: { params: Promise<{tag: string[]}> }) {
    
    const {tag} = await params
    return <Box >
<ProductListByTagComp filters={tag} />
    </Box> 
}