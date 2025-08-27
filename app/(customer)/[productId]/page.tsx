import { DetailProductComp } from "./detail-product.comp"

export default async function DetailProductPage({ params }: { params: Promise<any> }) {
    
    const {productId} = await params
    return <DetailProductComp productId={productId} />
}