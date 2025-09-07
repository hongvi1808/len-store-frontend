'use client'
import { categoryApis } from "@/base/apis/category.api";
import { productApis } from "@/base/apis/product.api";
import { ListParams } from "@/base/models/common.model";
import { ButtonBase } from "@/components/button/button-base.comp";
import { ProductCardSkeleton } from "@/components/product/product-card-skeleton.comp";
import { ProductCard } from "@/components/product/product-card.comp";
import { Box, Stack, Typography, } from "@mui/material"
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function ProductListByTagComp({ filters }: { filters: string[] }) {
    const [tag, slugCategory] = filters
    const pathname = usePathname();
    const [paginationModel, setPaginationModel] = useState<ListParams>({ page: 0, limit: 10 })
    const [width, setWidth] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    // QUERY
    const { isLoading, data } = useQuery({
        queryKey: ['customer-product-list-by-tag', paginationModel, tag, slugCategory,],
        queryFn: slugCategory !== 'all' ? () => productApis.getListBySlugCategory(slugCategory, paginationModel)
            : () => productApis.getListByTag(tag, paginationModel),
        enabled: !!tag || !!slugCategory
    });
    // QUERY
    const { isLoading: loadingCate, data: categories } = useQuery({
        queryKey: ['customer-category-list-by-tag', tag],
        queryFn: () => categoryApis.getListByTag(tag),
        enabled: !!tag
    });
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


    return (
        <Box ref={ref}>
            <Stack direction={'row'} sx={{overflowX: 'auto'}} spacing={2} marginBottom={2}>
                <ButtonBase component={Link} href={`/${tag}/all`} 
                 >
                    <Typography
                        variant="body1"
                        sx={{
                            textTransform: 'uppercase',
                            transition: "transform 120ms ease",
                            "&:hover": { transform: "translateY(-2px)" },
                            textDecoration: 'all' === slugCategory ? "underline" : 'none',
                            textDecorationThickness: "2px",
                            textUnderlineOffset: "4px",
                        }}
                    > {'Tất cả'}
                    </Typography>
                </ButtonBase>
                {(categories?.items || []).map((i: any) =>
                    <ButtonBase key={i.id} component={Link} href={`/${tag}/${i.slug}`} >
                        <Typography
                            variant="body1"
                            sx={{
                                textTransform: 'uppercase',
                                transition: "transform 120ms ease",
                                "&:hover": { transform: "translateY(-2px)" },
                                textDecoration: i.slug === slugCategory ? "underline" : 'none',
                                textDecorationThickness: "2px",
                                textUnderlineOffset: "4px",
                            }}
                        >{i.name}</Typography>
                    </ButtonBase>)}

            </Stack>

            <Stack gap={1} direction={'row'} flexWrap={'wrap'} justifyContent={'flex-start'}>
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
    );
}