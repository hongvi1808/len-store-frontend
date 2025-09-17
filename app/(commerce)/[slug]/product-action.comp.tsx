'use client'
import { cartApis } from "@/base/apis/cart.api";
import { ProductModel } from "@/base/models/product.model";
import { RootState, useAppDispatch } from "@/base/store";
import { updateLocalCart } from "@/base/store/slices/cart-local.slice";
import { getCountCartThunk } from "@/base/store/thunks/cart.thunk";
import { showAlertError } from "@/base/ui/toaster";
import { formatCurrency } from "@/base/utils/func";
import { ButtonIconText } from "@/components/button/buton-iconText.comp";
import { MinusIcon, PlusCircleIcon, PlusIcon, ShoppingBagIcon } from "@heroicons/react/16/solid";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function ProductAction({ data }: { data: ProductModel }) {
    const router = useRouter();
    const dispatch = useDispatch()
      const dispatchAsync = useAppDispatch() 
    
    const [quantity, setQuantity] = useState(1);
      const { loggedIn, user } = useSelector((state: RootState) => state.session)
 const { mutate } = useMutation({
    mutationFn: cartApis.create,
    onError: (error) => {
      console.error('Error calling api:', error);
      showAlertError(error.message)
    },
    onSuccess: (data) => {
      dispatchAsync(getCountCartThunk())
      
    },
  });
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
        if (user.userId) 
            mutate({ productId: data?.id, quantity: 1, classify: '', customerId: user.userId })
        else dispatch(updateLocalCart({
            id: data?.id,
            classify: '',
            quantity: quantity,
            product: data,
        }))
    }
    const onBuyNow = (e: any) => {
        e.preventDefault()
        router.push('/checkout')
    }
    return  <Stack flex={2} spacing={3}>
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
        </Stack>
    </Stack>
}