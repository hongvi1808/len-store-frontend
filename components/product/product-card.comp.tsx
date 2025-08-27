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
import { HeartIcon, ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "@/base/utils/func";

export type ProductExamp = {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  // oldPrice?: number;
  // rating?: number; // 0..5
  // sold?: number;
};

export type ProductCardProps = {
  product: ProductExamp;
  onAddToCart?: (p: ProductExamp) => void;
  onBuyNow?: (p: ProductExamp) => void;
  disabled?: boolean;
};

export function ProductCard({
  product,
  onAddToCart,
  onBuyNow,
  disabled,
}: ProductCardProps) {
  const { name, price, imageUrl, id } = product;

  return (
    <Card
      sx={{
        maxWidth: 250,
        borderRadius: 1,
        boxShadow: 1,
        mt: 0.5,
        overflow: "hidden",
        transition: "transform 120ms ease",
        "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
      }}
    >
      {/* Image with preserved aspect ratio */}
      <Box sx={{ position: "relative", marginX: -1, marginTop: -1 }}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          loading="lazy"
          sx={{ aspectRatio: "4 / 3", objectFit: "cover", borderRadius: 1, }}
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
              <IconButton size="small" disabled={disabled}>
                <HeartIcon height={16} width={16} />
              </IconButton>
              <IconButton size="small" disabled={disabled}>
                <ShoppingCartIcon height={16} width={16} />
              </IconButton>

            </Stack>
          </Stack>

        </Stack>
      </CardContent>
      <Button
        onClick={() => onBuyNow?.(product)}
        variant="contained"
        size="small"
        disabled={disabled}
      >
        Mua ngay
      </Button>
    </Card>
  );
}
