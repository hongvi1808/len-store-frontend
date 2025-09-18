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
import { formatCurrency } from "@/base/utils/func";
import { ProductModel } from "@/base/models/product.model";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/base/store";
import { updateLocalCart } from "@/base/store/slices/cart-local.slice";
import { useMutation } from "@tanstack/react-query";
import { cartApis } from "@/base/apis/cart.api";
import { showAlertError } from "@/base/ui/toaster";
import { goToOrder } from "@/base/store/slices/order.slice";
import { getCountCartThunk } from "@/base/store/thunks/cart.thunk";


export type ProductCardProps = {
  product: ProductModel
  parentWidth?: number | null
};

export function ProductCard({
  product, parentWidth
}: ProductCardProps) {
  const router = useRouter()
  const dispatch = useDispatch() 
  const dispatchAsync = useAppDispatch() 
  const { loggedIn, user } = useSelector((state: RootState) => state.session)
  const { mutate, isPending } = useMutation({
    mutationFn: cartApis.create,
    onError: (error) => {
      console.error('Error calling api:', error);
      showAlertError(error.message)
    },
    onSuccess: (data) => {
      dispatchAsync(getCountCartThunk())
      
    },
  });
  const { name, price, images, slug, id } = product;

  const onAddTocart = (e: any) => {
    e.preventDefault()
    if (loggedIn) {
      // authen thi viet vao call api
      mutate({ productId: id, quantity: 1, classify: '', customerId: user.userId })
    }
    else {
      dispatch(updateLocalCart({ id: product.id, product, quantity: 1, classify: '' }))

    }


  }
  const onBuyNow = (e: any) => {
    e.preventDefault()
    dispatch(goToOrder([{ id, image: images?.[0], name, price, quantity: 1, classify: '' }]))
    router.push('/checkout')
    console.log('onBuyNow', product)
  }
  const getWidthCard = (col: number) => {
    if (!parentWidth) return 250;
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
          <Typography variant="body1" fontWeight={500}  gutterBottom
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2, // số dòng muốn hiển thị
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
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
              }} onClick={onAddTocart} loading={isPending}>
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
