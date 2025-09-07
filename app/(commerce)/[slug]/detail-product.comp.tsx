'use client'
import { productApis } from "@/base/apis/product.api";
import { CartItemModel } from "@/base/models/cart.model";
import { updateLocalCart } from "@/base/store/slices/cart-local.slice";
import { gray, orange, red } from "@/base/ui/themePrimitive";
import { CART_LOCAL_STORAGE_KEY } from "@/base/utils/constants";
import { formatCurrency, } from "@/base/utils/func";
import { ButtonIconText } from "@/components/button/buton-iconText.comp";
import { ButtonBack } from "@/components/button/button-back.comp";
import { MinusIcon, PlusIcon, ShoppingBagIcon } from "@heroicons/react/16/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Box, Button, CardMedia, IconButton, Paper, Skeleton, Stack, TextField, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export function DetailProductComp({ slug }: { slug: string }) {
    const router = useRouter();
    const dispatch = useDispatch()
    const [selectImage, setSelectImage] = useState<string>()
    const [quantity, setQuantity] = useState(1);
    const { isLoading, data } = useQuery({
        queryKey: ['customer-product-slug', slug,],
        queryFn: () => productApis.getBySlug(slug),
        enabled: !!slug,
    });
    const handleSelectImage = useCallback((url: string) => {
        setSelectImage(url)
    }, [data?.images])


    const handleIncrease = () => {
        if (quantity < data?.stock) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const onAddTocart = (e: any) => {
        e.preventDefault()
        dispatch(updateLocalCart({
            id: data?.id,
            classify: '',
            quantity: quantity,
            product: data,
        }))
    }
    const onBuyNow = (e: any) => {
        e.preventDefault()
        router.push('/order')
    }
    return (
        <Stack padding={5} spacing={5} direction={'row'} justifyContent={'space-between'}>
            <ButtonBack />

            <Stack flex={1.2} spacing={1} >
                <Paper  >
                    <CardMedia
                        component="img"
                        image={selectImage || data?.images?.[0]}
                        loading="lazy"
                        sx={{ aspectRatio: "1/1", objectFit: "contain", objectPosition: 'center', borderRadius: 1, }}
                    />
                </Paper>
                <Stack direction={'row'}>
                    {!!(data?.images?.length > 0) &&
                        data?.images?.map((i: any, indx: number) =>
                            <Box key={indx}
                                width={{ lg: '20%', md: '25%', sm: '33%', sx: '50%' }}
                                component={Button}
                                onClick={() => handleSelectImage(i)}>
                                <CardMedia
                                    component="img"
                                    image={i}
                                    loading="lazy"
                                    sx={{ aspectRatio: "1/ 1", objectFit: "cover", objectPosition: 'center', borderRadius: 1, }}
                                />
                            </Box>)
                    }
                </Stack>

            </Stack>
            <Stack flex={2} spacing={3}>
                {isLoading ? <Skeleton variant="text" width="60%" height={40} /> :
                    <Typography variant="h4" fontWeight="bold" textTransform={'capitalize'}>
                        {data?.name}
                    </Typography>}

                {isLoading ? <Skeleton variant="text" width="40%" height={30} />
                    : <Typography variant="h5" color="primary" fontWeight="600">
                        {formatCurrency(data?.price)}
                    </Typography>}

                <Stack direction="row" alignItems="flex-start" spacing={2}>
                    <Typography variant="body1" width="15%" color="text.secondary">{'Vận chuyển:'}</Typography>
                    <Stack>
                        <Typography variant="body2"  >{'Nhận hàng từ 2-3 ngày'}</Typography>
                        <Typography variant="body2"  >{`Phí ship ${formatCurrency(0)}`}</Typography>

                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2} paddingY={1}>
                    <Typography variant="body1" width="15%" color="text.secondary">{'Số lượng:'}</Typography>
                    <IconButton onClick={handleDecrease} disabled={quantity === 1}>
                        <MinusIcon height={16} width={16} />
                    </IconButton>
                    <TextField
                        value={quantity}
                        size="small"
                        sx={{ width: 60, textAlign: "center" }}
                        inputProps={{
                            style: { textAlign: "center" },
                            readOnly: true,
                        }}
                    />
                    <IconButton
                        onClick={handleIncrease}
                        disabled={quantity === data?.stock}
                    >
                        <PlusIcon height={16} width={16} />
                    </IconButton>
                    <Typography variant="caption" color="text.secondary">
                        {`(Còn ${data?.stock - quantity} sản phẩm)`}
                    </Typography>
                </Stack>

                {/* Nút hành động */}
                {isLoading ? (
                    <Stack direction="row" spacing={2}>
                        <Skeleton variant="rectangular" width={150} height={50} />
                        <Skeleton variant="rectangular" width={150} height={50} />
                    </Stack>
                ) : (
                    <Stack direction="row" spacing={2}>

                        <ButtonIconText
                            iconComp={<PlusCircleIcon />}
                            title="Thêm vào giỏ"
                            onClick={onAddTocart}
                            buttonProps={{ variant: 'outlined', size: 'large', color: 'secondary' }}
                        />
                        <ButtonIconText
                            iconComp={<ShoppingBagIcon />}
                            title="Mua ngay"
                            onClick={onBuyNow}
                            buttonProps={{ color: 'secondary', size: 'large', }}
                        />
                    </Stack>)}

                {/* Mô tả sản phẩm */}
                <Paper sx={{ padding: 2, minHeight: 140 }}>
                    <Typography variant="button" my={1}>
                        {'Mô tả sản phẩm'}
                    </Typography>
                    {isLoading ? (
                        <>
                            <Skeleton variant="text" width="30%" height={30} />
                            <Skeleton variant="text" width="90%" />
                            <Skeleton variant="text" width="85%" />
                            <Skeleton variant="text" width="80%" />
                        </>) :
                        <Typography variant="body1" color="text.secondary">
                            {data?.description}
                        </Typography>}
                </Paper>
            </Stack>
        </Stack>
    )
}