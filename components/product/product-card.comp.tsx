'use client'
import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Stack,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { formatCurrency, setCartLocal } from "@/base/utils/func";
import { ProductModel } from "@/base/models/product.model";
import Link from "next/link";
import { useRouter } from "next/navigation";


export type ProductCardProps = {
  product: ProductModel
  parentWidth?: number | null
};

export function ProductCard({
  product, parentWidth
}: ProductCardProps) {
  const router= useRouter()
  const { name, price, images, slug, id } = product;

  const onAddTocart = (e: any) => {
    e.preventDefault()
    console.log('onaddTocart', product)
    setCartLocal({id, product, quantity: 1, classify: ''})
    // authen thi viet vao call api
    

  }
  const onBuyNow = (e: any) => {
    e.preventDefault()
    // viet sp vao redux
    router.push('/router')
    console.log('onBuyNow', product)
  }
  const getWidthCard = (col: number) => {
    if (!parentWidth) return 275;
    return (parentWidth - 8 * col) / col
  }

  return (
    <Card
      id={id}
      key={id}
      component={Link}
      href={`/${slug}`}
      sx={{
        width: { xs: getWidthCard(2), sm: getWidthCard(3), md: getWidthCard(4), lg: getWidthCard(6) },
        borderRadius: 1,
        boxShadow: 1,
        mt: 0.5,
        overflow: "hidden",
        transition: "transform 120ms ease",
        "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
      }}
    >
      <Box sx={{ position: "relative", marginX: -1, marginTop: -1 }}>
        <CardMedia
          component="img"
          image={images?.[0]}
          alt={name}
          loading="lazy"
          height={'150px'}
          sx={{ aspectRatio: "1 / 1", objectFit: "cover", objectPosition: 'center', borderRadius: 1, }}
        />
      </Box>

      <CardContent sx={{ py: 1 }}>
        <Stack spacing={0.5}>
          <Typography variant="body1" fontWeight={500}>
            {name}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" justifyContent={'space-between'}>
            <Typography variant="body1" fontWeight={500} color="text.secondary" >
              {formatCurrency(price)}
            </Typography>
            <Stack spacing={0.5} direction={'row'}>
              <IconButton sx={{
                size: {
                  md: 'medium', sm: 'small', transition: "transform 120ms ease",
                  "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
                }
              }} >
                <HeartIcon height={16} width={16} />
              </IconButton>
              <IconButton sx={{
                size: { md: 'medium', sm: 'small' }, transition: "transform 120ms ease",
                "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
              }} onClick={onAddTocart}>
                <ShoppingCartIcon height={16} width={16} />
              </IconButton>

            </Stack>
          </Stack>

        </Stack>
      </CardContent>
      <Button
        onClick={onBuyNow}
        variant="contained"
        size="small"

        sx={{
          transition: "transform 120ms ease",
          "&:hover": { transform: "scale(1.1)" },
        }}
      >
        Mua ngay
      </Button>
    </Card>
  );
}
