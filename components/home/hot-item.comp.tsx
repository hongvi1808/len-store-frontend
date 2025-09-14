import { productApis } from "@/base/apis/product.api";
import { Icon, Stack, Typography } from "@mui/material";
import { ButtonBase } from "../button/button-base.comp";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { ProductCard } from "../product/product-card.comp";


async function fetchHotProducts() {
  try {
    const data = await productApis.getListBySlugCategory('top-hot', { limit: 10, page: 0 })
    return data?.items
  } catch (error) {
    throw error
  }
}

export async function HotItemSection() {
  const products = await fetchHotProducts()
  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top sản phẩm thủ công bằng len hot nhất ",
    "itemListElement": products.map((p: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://myshop.com/products/${p.slug}`,
      item: {
        "@type": "Product",
        name: p.name,
        image: p.image,
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
  return (<Stack spacing={{ sm: 4, md: 6, lg: 8 }} width={'100%'} alignItems={'center'} mb={8} >
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <Stack width={'100%'} alignItems={'center'} spacing={2} >
      <Typography variant="caption" color="textSecondary" >
        {'/top-hot'}
      </Typography>
      <Typography textAlign={'center'} width={'30vw'} variant="h2" textTransform={'uppercase'} >
        {'Top những sản phẩm hot nhất'}
      </Typography>
    </Stack>
    <Stack direction={'row'} justifyContent={'space-evenly'} gap={2} flexWrap={'wrap'}>

      {(products || [])?.map((p: any, idx: any) => (
        <ProductCard key={idx} product={p} />
      ))}
    </Stack>
    <ButtonBase component={Link} href="/other/top-hot"
      color="secondary"
      variant="outlined" size="large"
      endIcon={<Icon><ArrowRightIcon /></Icon>}>
      {'Xem tất cả sản phẩm'}
    </ButtonBase>
  </Stack>
  )
}