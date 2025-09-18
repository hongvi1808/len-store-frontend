import { Box, Stack, Typography } from "@mui/material";
import { ButtonBase } from "@/components/button/button-base.comp";
import Link from "next/link";
import { ProductList } from "@/components/product/product-list.comp";
import { categoryApis } from "@/base/apis/category.api";
import { productApis } from "@/base/apis/product.api";
import { customerMenu } from "@/base/utils/config";

async function fetchCategoryByTag(tag: string) {
    try {
        const data = await categoryApis.getListByTag(tag)
        return data?.items
    } catch (error) {
        throw error
    }
}
async function fetchProductList(tag: string, slug: string, pageNumber: number) {
    try {
        if (slug === 'all') {
            const data = await productApis.getListByTag(tag, { page: pageNumber - 1, limit: 12 })
            return data
        }
        return (await productApis.getListBySlugCategory(slug, { page: pageNumber - 1, limit: 12 }))
    } catch (error) {
        throw error
    }
}


export default async function ProductByTagPage({ params, searchParams }:
    { params: Promise<{ tag: string[] }>, searchParams: Promise<{ page?: string }> }) {
    const [tag, slug] = (await params)?.tag
    const { page } = await searchParams
    const pageNum = Number(page || '') || 1;
    const validTag = customerMenu.find(i => i.href.startsWith('/' + tag))
    const categories = validTag &&  (await fetchCategoryByTag(tag))
    const { items, totalPage } = await fetchProductList(tag, slug, pageNum)
    // JSON-LD structured data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": categories?.find((i: any) => i.slug === slug)?.name
            || `Tất cả sản phẩm ${customerMenu.find(i => i.href === '/' + tag + '/' + slug)?.title}`,
        "itemListElement": items.map((p: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${process.env.NEXT_PUBLIC_DOMAIN}/${p.slug}`,
            item: {
                "@type": "Product",
                name: p.name,
                image: p.images?.[0],
                description: p.description,
                sku: p.id,
                brand: { "@type": "Brand", name: 'LenStore' },
                offers: {
                    "@type": "Offer",
                    priceCurrency: "VND",
                    price: p.price,
                    availability: "https://schema.org/InStock",
                    url: `${process.env.NEXT_PUBLIC_DOMAIN}/${p.slug}`,
                },
                aggregateRating: {
                    "@type": "AggregateRating",
                    "ratingValue": "4.5",
                    "reviewCount": "230"
                }
            },
        })),
    }
    return (
        <Box width={'100%'}  >
            <Stack direction={'row'} sx={{ overflowX: 'auto' }} spacing={2} marginBottom={2}>
                <ButtonBase component={Link} href={`/${tag}/all`}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            textTransform: 'uppercase',
                            transition: "transform 120ms ease",
                            "&:hover": { transform: "translateY(-2px)" },
                            textDecoration: 'all' === slug ? "underline" : 'none',
                            textDecorationThickness: "2px",
                            textUnderlineOffset: "4px",
                        }}
                    > {'Tất cả'}
                    </Typography>
                </ButtonBase>
                {(categories || []).map((i: any) =>
                    <ButtonBase key={i.id} component={Link} href={`/${tag}/${i.slug}`} >
                        <Typography
                            variant="body1"
                            sx={{
                                textTransform: 'uppercase',
                                transition: "transform 120ms ease",
                                "&:hover": { transform: "translateY(-2px)" },
                                textDecoration: i.slug === slug ? "underline" : 'none',
                                textDecorationThickness: "2px",
                                textUnderlineOffset: "4px",
                            }}
                        >{i.name}</Typography>
                    </ButtonBase>)}

            </Stack>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductList items={items} totalPage={totalPage || 1} />

        </Box>
    )
}