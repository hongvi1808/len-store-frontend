'use client'
import { categoryApis } from "@/base/apis/category.api";
import { productApis } from "@/base/apis/product.api";
import { ListParams } from "@/base/models/common.model";
import { ButtonBase } from "@/components/button/button-base.comp";
import { ProductCardSkeleton } from "@/components/product/product-card-skeleton.comp";
import { ProductCard } from "@/components/product/product-card.comp";
import { ProductList } from "@/components/product/product-list.comp";
import { Box, Stack, Typography, } from "@mui/material"
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export function ProductListByTagComp({ filters }: { filters: string[] }) {
    const [tag, slugCategory] = filters
    // QUERY
    const { isLoading: loadingCate, data: categories } = useQuery({
        queryKey: ['customer-category-list-by-tag', tag],
        queryFn: () => categoryApis.getListByTag(tag),
        enabled: !!tag
    });


    return (
        <Box width={'100%'}  >
            <Stack  direction={'row'} sx={{overflowX: 'auto'}} spacing={2} marginBottom={2}>
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

           <ProductList tag={tag} slugCategory={slugCategory} />
        </Box>
    );
}