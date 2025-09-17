import { productApis } from "@/base/apis/product.api";
import { formatCurrency, } from "@/base/utils/func";
import { ButtonBack } from "@/components/button/button-back.comp";
import { Paper, Stack, Typography } from "@mui/material"
import { Metadata } from "next";
import { CardImageProduct } from "./card-image.comp";
import { ProductAction } from "./product-action.comp";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const param = await params;
  const product = await fetchDetailProduct(param?.slug);

  return {
    title: `${product.name} | LenStore`,
    description: product.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DOMAIN}/${product.slug}`,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/${product.slug}`,
    },
  };
}

async function fetchDetailProduct(slug: string,) {
  try {
    const data = await productApis.getBySlug(slug)
    return data
  } catch (error) {
    throw error
  }
}

export default async function DetailProductPage({ params }: { params: Promise<any> }) {

  const { slug } = await params
  const product = await fetchDetailProduct(slug)
  // JSON-LD structured data
      const jsonLd = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "image": product.images,
            "description": product.description,
            "sku": product.id,
            "brand": { "@type": "Brand", "name": 'LenStore' },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "VND",
              "price": product.price,
              "availability": "https://schema.org/InStock",
              "url": `${process.env.NEXT_PUBLIC_DOMAIN}/${slug}`,
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": product.rating,
              "reviewCount": product.reviewCount,
            },
      }
  return <Stack paddingY={5} direction={'row'} justifyContent={'space-between'}>
     <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
    <ButtonBack />

    <CardImageProduct images={product?.images}/>
    <Stack flex={2} spacing={3}>
      <Typography variant="h4" fontWeight="bold" textTransform={'capitalize'}>
        {product?.name}
      </Typography>

      <Typography variant="h5" color="primary" fontWeight="600">
        {formatCurrency(product?.price)}
      </Typography>

      <ProductAction data={product}/>

      {/* Mô tả sản phẩm */}
      <Paper sx={{ padding: 2, minHeight: 140 }}>
        <Typography variant="button" my={1}>
          {'Mô tả sản phẩm'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {product?.description}
        </Typography>
      </Paper>
    </Stack>
  </Stack>
}