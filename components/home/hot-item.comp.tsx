'use client'
import { productApis } from "@/base/apis/product.api";
import { Icon, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ButtonBase } from "../button/button-base.comp";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { ProductCard } from "../product/product-card.comp";

export function HotItemSection() {
    const { data, isLoading } = useQuery({
            queryKey: ['products-top-hot'],
            queryFn: () => productApis.getListBySlugCategory('top-hot', { limit: 10, page: 0 }),
            refetchInterval: 1000 * 60 * 5, // 5 phút
        })
    return (<Stack spacing={{ sm: 4, md: 6, lg: 8 }} width={'100%'} alignItems={'center'} mb={8} >
              <Stack width={'100%'} alignItems={'center'} spacing={2} >
                <Typography variant="caption" color="textSecondary" >
                  {'/top-hot'}
                </Typography>
                <Typography textAlign={'center'} width={'30vw'} variant="h2" textTransform={'uppercase'} >
                  {'Top những sản phẩm hot nhất'}
                </Typography>
              </Stack >
              {(data?.items || [])?.map((p: any, idx: any) => (
                                  <ProductCard key={idx} product={p} />
                              ))}
              <ButtonBase component={Link} href="/handmade/all"
                color="secondary"
                variant="outlined" size="large"
                endIcon={<Icon><ArrowRightIcon /></Icon>}>
                {'Xem tất cả sản phẩm'}
              </ButtonBase>
            </Stack>
        )}