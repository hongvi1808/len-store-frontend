'use client'
import { ListParams } from "@/base/models/common.model";
import { Box, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { ProductCardSkeleton } from "./product-card-skeleton.comp";
import { ProductCard } from "./product-card.comp";
import { productApis } from "@/base/apis/product.api";
import { ButtonBase } from "../button/button-base.comp";


export type ProductListProps = {
    slugCategory: string; tag: string, limit?: number;
};
export function ProductList({slugCategory, tag, limit}: ProductListProps) {
    const [paginationModel, setPaginationModel] = useState<ListParams>({ page: 0, limit: limit || 10 })
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

     // QUERY
    const { isLoading, data } = useQuery({
        queryKey: ['customer-product-list-by-tag', paginationModel, tag, slugCategory,],
        queryFn: slugCategory !== 'all' ? () => productApis.getListBySlugCategory(slugCategory, paginationModel)
            : () => productApis.getListByTag(tag, paginationModel),
        enabled: !!tag || !!slugCategory
    });
    return (
        <Box width={'100%'} ref={ref} >

        <Stack gap={2} direction={'row'} flexWrap={'wrap'} justifyContent={'flex-start'}>
                {isLoading ? Array.from({ length: 10 }).map((p, idx) => (
                    <ProductCardSkeleton parentWidth={width} key={idx} />
                )) : (data?.items || [])?.map((p: any, idx: any) => (
                    <ProductCard parentWidth={width} key={idx} product={p} />
                ))
            }
                {!isLoading && !data?.items?.length && 
                <Typography variant="body2">{'Hiện tại chưa có sản phẩm nào!'}</Typography>}
            </Stack>
                </Box>
    )

}