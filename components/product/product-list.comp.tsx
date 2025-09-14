'use client'
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProductCard } from "./product-card.comp";
import { ProductModel } from "@/base/models/product.model";
import { useRouter, useSearchParams } from "next/navigation";


export type ProductListProps = {
    items: ProductModel[]
    totalPage: number
};
export function ProductList({ items, totalPage }: ProductListProps) {
    const searchParams = useSearchParams()
    const router = useRouter();
    const [width, setWidth] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!ref.current) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    const handleChangePage = (e: any, page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    }

    return (
        <Box width={'100%'} ref={ref} >

            <Stack gap={2} direction={'row'} flexWrap={'wrap'} justifyContent={'flex-start'}>
                {(items || [])?.map((p: any, idx: any) => (
                    <ProductCard parentWidth={width} key={idx} product={p} />
                ))}
                {!items?.length &&
                    <Typography variant="body2">{'Hiện tại chưa có sản phẩm nào!'}</Typography>}
            </Stack>
            {totalPage > 1 &&
                <Pagination sx={{ justifySelf: 'center', mt: 5 }}
                    count={totalPage} shape="rounded"
                    color="primary"
                    defaultPage={Number(searchParams.get('page'))}
                    onChange={handleChangePage}
                />}

        </Box>
    )

}