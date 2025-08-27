'use client'
import { ProductCard, ProductExamp } from "@/components/product/product-card.comp";
import {  Stack, } from "@mui/material"

export function ProductListByTagComp({ filters }: { filters: string[] }) {
    console.log('filter', filters)
    const [tags, slugCategory] = filters
    console.log('tag', tags, slugCategory)
    const sample: ProductExamp = {
        id: "p01",
        name: "Tai nghe Bluetooth Chống Ồn Pro Max",
        price: 1790000,
        // oldPrice: 2590000,
        imageUrl:
            'https://bizweb.dktcdn.net/100/267/913/products/sg-11134201-7rbmg-loc1309wmzwx3c-1727665702999.jpg?v=1743839541293',
        // rating: 4.6,
        // sold: 321,
    };

    const handleAdd = (p: ProductExamp) => alert(`Thêm vào giỏ: ${p.name}`);
    const handleBuy = (p: ProductExamp) => alert(`Mua ngay: ${p.name}`);

    return (
        <Stack  gap={1} direction={'row'} flexWrap={'wrap'} justifyContent={'center'}>
                {Array.from({ length: 30 }, (_, i) => (sample)).map((p, idx) => (
                    <ProductCard key={idx} product={sample} onAddToCart={handleAdd} onBuyNow={handleBuy} />
                ))}
        </Stack>
    );
}