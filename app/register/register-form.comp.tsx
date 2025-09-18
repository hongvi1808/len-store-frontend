'use client'
import { authApis } from "@/base/apis/auth.api";
import { cartApis } from "@/base/apis/cart.api";
import { RootState, useAppDispatch } from "@/base/store";
import { clearCart } from "@/base/store/slices/cart-local.slice";
import { clearOrder, switchLocalToUser } from "@/base/store/slices/order.slice";
import { setSession } from "@/base/store/slices/session.slice";
import { getUserSessionThunk } from "@/base/store/thunks/user.thunk";
import { showAlertError, showAlertQuestion, showAlertSuccess } from "@/base/ui/toaster";
import { validPhone, validRequire, validUsername } from "@/base/utils/func";
import { TextFiledControlBase } from "@/components/textfield/textfield.comp"
import { Box, Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function CustomerRegisterForm() {
    const router = useRouter()
    const dispatch = useDispatch()
    const dispatchAsync = useAppDispatch()
    const { products: cartItems } = useSelector((state: RootState) => state.cartLocal)

    const [equalPass, setEqualPass] = useState(true)
    const { mutate, isPending } = useMutation({
        mutationFn: authApis.register,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)
        },
        onSuccess: (data) => {
            dispatch(setSession(data))
            dispatchAsync(getUserSessionThunk(data.userId))
            router.back()
            handleSyncCart(data.userId)

        },
    });
    const handleSyncCart = (userId: string) => {
        if (!cartItems?.length) return;
        showAlertQuestion(`Bạn có muốn đồng bộ ${cartItems?.length} sản phẩm trong giỏ hàng vào tài khoản?`,
            { confirmButtonText: 'Đồng ý', cancelButtonText: 'Hủy' })
            .then((result) => {
                if (result.isConfirmed) {
                    const data = cartItems.map(item => ({
                        productId: item.id, quantity: item.quantity, classify: '', customerId: userId
                    }))
                    mutateSync(data)
                    dispatch(switchLocalToUser(userId))

                }

            })
    }
    // MUTATE
    const { mutate: mutateSync } = useMutation({
        mutationFn: cartApis.createMany,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)
        },
        onSuccess: (data) => {
            showAlertSuccess(`Đã đồng bộ thành công ${data?.count} sản phẩm vào tài khoản thành công!`);
            dispatch(clearCart())
            dispatch(clearOrder())

        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries())
        if (data.password !== data.repeatPassword) {
            setEqualPass(false);
            return;
        }
        // TODO call api post
        mutate(data)
    }
    return <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
        <TextFiledControlBase
            name='fullName'
            getErrorMessage={validRequire}
            inputProps={{ placeholder: 'Nhập tên', required: true, }}
        />
        <TextFiledControlBase
            name='phoneNumber'
            getErrorMessage={validPhone}
            inputProps={{ placeholder: 'Nhập số điện thoại... ', required: true, }}
        />
        <TextFiledControlBase
            name='password'
            getErrorMessage={validRequire}
            inputProps={{ placeholder: 'Nhập mật khẩu', type: 'password', required: true }}
        />
        <TextFiledControlBase
            name='repeatPassword'
            getErrorMessage={validRequire}
            errorMessage={!equalPass ? 'Mật khẩu chưa trùng khớp' : ''}
            inputProps={{ placeholder: 'Nhập ại mật khẩu', type: 'password', required: true }}
        />
        <Button
            type="submit"
            fullWidth
            loading={isPending}
            variant="contained"
        >
            {'Submit'}
        </Button>
    </Box>
}