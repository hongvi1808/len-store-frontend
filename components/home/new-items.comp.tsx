'use client'
import { Box, CardMedia, Stack, Typography } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from 'embla-carousel-auto-scroll'
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { productApis } from "@/base/apis/product.api";

export function NewItemsSection() {
    const [emblaRef] = useEmblaCarousel({
        loop: true,
    }, [
        AutoScroll({ playOnInit: true, speed: 2, stopOnInteraction: false }),
    ])
    const { data, isLoading } = useQuery({
        queryKey: ['products-new-handmade'],
        queryFn: () => productApis.getListByTag('handmade', { limit: 10, page: 0 }),
    })
    return (<Stack spacing={{ sm: 4, md: 6, lg: 8 }} width={'100%'} alignItems={'center'} mb={8} >
        <Stack width={'100%'} alignItems={'center'} spacing={2} >
            <Typography variant="caption" color="textSecondary" >
                {'/new-handmade'}
            </Typography>
            <Typography textAlign={'center'} width={'30vw'} variant="h2" textTransform={'uppercase'} >
                {'Những mẫu thủ công mới nhất'}
            </Typography>
        </Stack >
        <Box ref={emblaRef} sx={{ overflow: 'hidden', width: '100%', }} >
            <Stack width={'100%'} height={'100%'} direction={'row'}>
                {data?.items?.map((item: any) => (
                    <Box className={'flex-[0_0_30%] ml-2'} component={Link} href={`/${item.slug}`}
                        key={item.id}
                    >
                        <Typography mb={1} textTransform={'capitalize'} textAlign={'center'} variant="body1">
                            {item.name}
                            </Typography>

                        <CardMedia component="img"
                            image={item.images?.[0]}
                            alt={item.name}
                            loading="lazy"
                            sx={{
                                aspectRatio: "1/ 1",
                                objectFit: "cover",
                                objectPosition: 'center',
                                width: '100%', height: '60vh'

                            }}
                        />
                    </Box>
                ))}
            </Stack>
        </Box>

    </Stack>)
}