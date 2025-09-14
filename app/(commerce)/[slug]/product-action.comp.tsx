'use client'
import { ProductModel } from "@/base/models/product.model";
import { updateLocalCart } from "@/base/store/slices/cart-local.slice";
import { formatCurrency } from "@/base/utils/func";
import { ButtonIconText } from "@/components/button/buton-iconText.comp";
import { MinusIcon, PlusCircleIcon, PlusIcon, ShoppingBagIcon } from "@heroicons/react/16/solid";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function ProductAction({ data }: { data: ProductModel }) {
    const router = useRouter();
    const dispatch = useDispatch()
    const [selectImage, setSelectImage] = useState<string>()
    const [quantity, setQuantity] = useState(1);
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