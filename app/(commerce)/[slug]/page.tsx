import { DetailProductComp } from "./detail-product.comp"

export default async function DetailProductPage({ params }: { params: Promise<any> }) {
    
    const {slug} = await params
    return <DetailProductComp slug={slug} />
}