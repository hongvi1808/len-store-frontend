'use client'
import { orderApis } from "@/base/apis/order.api";
import { RootState, useAppSelector } from "@/base/store";
import { removeCartItems } from "@/base/store/slices/cart-local.slice";
import { pushInfoCreateOrderLocal, updateStatusOrder } from "@/base/store/slices/order.slice";
import { showAlertSuccess } from "@/base/ui/toaster";
import { formatCurrency, validEmail, validPhone, validRequire } from "@/base/utils/func";
import { ButtonIconText } from "@/components/button/buton-iconText.comp";
import { ButtonBase } from "@/components/button/button-base.comp";
import { PaymentInfo } from "@/components/product/payment-info.comp";
import { TextFiledControlBase } from "@/components/textfield/textfield.comp";
import {  ChevronLeftIcon } from "@heroicons/react/16/solid";
import { Badge, Box, CardMedia, Divider, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function CheckoutForm() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { products, totalPrice } = useSelector((state: RootState) => state.order)
    const { loggedIn, user } = useSelector((state: RootState) => state.session)
    const { item: userInfo } = useAppSelector((state: RootState) => state.user)
    const [paymentMethod, setPaymentMethod] = useState<string | undefined>();
    const { mutate, isPending } = useMutation({
        mutationFn: orderApis.customerOrder,
        onSuccess: (data) => {
            if (!loggedIn) dispatch(pushInfoCreateOrderLocal(data))
            dispatch(updateStatusOrder(data.status))
            showAlertSuccess('Đã đặt hàng thành công!', { timer: undefined })
            router.replace('/order')
            if (loggedIn) console.log('')
            else dispatch(removeCartItems(products.map(i => i.id)))

        }
    })
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries())
        mutate({ ...data, products, totalPrice, paymentMethod, customerId: user.userId || '' })
        // TODO call api post
    }
    return (
        <Stack spacing={3} direction={'row'} alignContent={'space-around'}>
            <Stack flex={1} spacing={2}>
                <Typography variant="h6" fontWeight={500}>{'Thông tin nhận hàng'}</Typography>
                <Box id="order-customer-form"
                    component={'form'}
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} >
                    <TextFiledControlBase
                        name='name'
                        getErrorMessage={validRequire}
                        inputProps={{ placeholder: 'Tên*', required: true, defaultValue: userInfo.fullName }}
                    />
                    <TextFiledControlBase
                        name='phoneNumber'
                        getErrorMessage={validPhone}
                        inputProps={{ placeholder: 'Số điện thoại*', required: true,defaultValue: userInfo.phoneNumber }}
                    />
                    <TextFiledControlBase
                        name='email'
                        getErrorMessage={(value) => validEmail(value, true)}
                        inputProps={{ placeholder: 'Email (tùy chọn)', defaultValue: userInfo.email }}
                    />
                    <TextFiledControlBase
                        name='address'
                        getErrorMessage={validRequire}
                        inputProps={{ placeholder: 'Địa chỉ*', required: true,  defaultValue: userInfo.address}}
                    />
                    <TextFiledControlBase
                        name='note'
                        inputProps={{ placeholder: 'Ghi chú (tùy chọn) ', rows: 3 }}
                    />
                </Box>
            </Stack>

            <Stack flex={1} spacing={2}>
                <Typography variant="h6" fontWeight={500}>{'Thanh toán'}</Typography>
                <PaymentInfo getOptionSelect={(value) => setPaymentMethod(value)} />
            </Stack>

            <Stack flex={1} spacing={4} >
                <Typography variant="h6" fontWeight={500}>{'Sản phẩm'}</Typography>
                <Stack spacing={2}>
                    {products.map((item) =>
                        <Box key={item.id} sx={{ display: "flex", alignItems: "center", }}>

                            <Box sx={{ width: 40, height: 40, borderRadius: 1, mr: 1 }} >
                                <Badge badgeContent={`x${item.quantity}`} color="primary">
                                    <CardMedia
                                        component="img"
                                        image={item.image}
                                        loading="lazy"
                                        sx={{ aspectRatio: "1/ 1", objectFit: "cover", objectPosition: 'center', borderRadius: 1, }}
                                    />
                                </Badge>
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="body1">{item.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.classify || ''}
                                </Typography>
                            </Box>
                            <Typography color="textSecondary">{formatCurrency(item.price * item.quantity)}</Typography>
                        </Box>
                    )}
                </Stack>
                <Divider />
                <Stack spacing={2}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant="body2" color="text.secondary">{'Tổng tiền hàng'}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {formatCurrency(totalPrice)}
                        </Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant="body2" color="text.secondary">{'Phí vận chuyển'}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {''}
                        </Typography>
                    </Stack>
                </Stack>
                <Divider />
                <Stack spacing={2}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant="body2" color="text.secondary">{'Tổng cộng'}</Typography>
                        <Typography variant="subtitle1" color="primary">
                            {formatCurrency(totalPrice)}
                        </Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <ButtonIconText iconComp={<ChevronLeftIcon />} title="Quay lại giỏ hàng" buttonProps={{ variant: 'text' }} />
                        <ButtonBase
                            loading={isPending}
                            form="order-customer-form"
                            color="secondary" size="large"
                            type="submit"
                            variant="contained" >
                            {'Đặt hàng'}
                        </ButtonBase>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}