'use client'
import { cartApis } from "@/base/apis/cart.api";
import { CartItemModel } from "@/base/models/cart.model";
import { ListParams } from "@/base/models/common.model";
import { RootState, useAppDispatch, useAppSelector } from "@/base/store";
import { removeCartItems, updateLocalCart } from "@/base/store/slices/cart-local.slice";
import { goToOrder, updateProductOrder, updateTotalPriceOrder } from "@/base/store/slices/order.slice";
import { getCountCartThunk, getListCartThunk } from "@/base/store/thunks/cart.thunk";
import { showAlertError } from "@/base/ui/toaster";
import { formatCurrency, } from "@/base/utils/func";
import { ButtonBase } from "@/components/button/button-base.comp";
import { ButtonIcon } from "@/components/button/button-icon.comp";
import TableBase from "@/components/table/table-base.comp";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Box, CardMedia, Container, IconButton, Stack, TextField, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function CartTableComp() {
    const queryClient = useQueryClient();
    const router = useRouter()
    const dispatchAsyn = useAppDispatch()
    const { products: cartUser, total, } = useAppSelector((state: RootState) => state.cartUser)
    const { products: cartLocal } = useSelector((state: RootState) => state.cartLocal)
    const { products: orderLocal } = useSelector((state: RootState) => state.order)
    const { loggedIn, user } = useSelector((state: RootState) => state.session)
    const dispatch = useDispatch()
    const [paginationModel, setPaginationModel] = useState<ListParams>({ page: 0, limit: 5 })
    useEffect(() => {
        if (user.userId)
            dispatchAsyn(getListCartThunk({...paginationModel,}))
    }, [])
    // MUTATE
    const { mutate: mutateUpdateCartItem } = useMutation({
        mutationFn: cartApis.update,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)
        },
        onSuccess: (data) => {
            dispatchAsyn(getListCartThunk({...paginationModel,}))
        },
    });
    const { mutate: removeMutate } = useMutation({
        mutationFn: cartApis.remove,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)
        },
        onSuccess: (data) => {
            dispatchAsyn(getListCartThunk({...paginationModel, }))
            dispatchAsyn(getCountCartThunk())
        },
    });
    const onBuy = () => {
        dispatch(updateTotalPriceOrder(calTotalPriceSelected))
        router.push('/checkout')
    }
    const onSelectedChange = (e: any) => {
        let selectItem;
        if (e.type === 'include') {
            const selectedData = (loggedIn ? cartUser : cartLocal).filter((row: any) => e.ids.has(row.id));
            selectItem = selectedData.map((i: any) => ({
                id: i.product.id, image: i.product.images?.[0],
                name: i.product.name, price: i.product.price,
                quantity: i.quantity, classify: i.classify
            }))
        }
        if (e.type === 'exclude' && !e.ids.size) {
            selectItem = (loggedIn ? cartUser : cartLocal).map((i: any) => ({
                id: i.product.id, image: i.product.images?.[0],
                name: i.product.name, price: i.product.price,
                quantity: i.quantity, classify: i.classify
            }))
        }
        dispatch(goToOrder({ totalPrice: calTotalPriceSelected, products: selectItem }))
    }
    const calTotalPriceSelected = useMemo((): number => {
        return orderLocal?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
    }, [orderLocal])

    const handleIncrease = (item: any, isSlectedRow: boolean) => {
        if (item.quantity < item.product.stock) {
            if (loggedIn) mutateUpdateCartItem({ id: item.id, quantity: item.quantity + 1, classify: '' })
            else dispatch(updateLocalCart({ ...item, quantity: item.quantity + 1 }))
            if (isSlectedRow) dispatch(updateProductOrder({
                id: item.product.id,
                image: item.product.images?.[0],
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity + 1,
                classify: item.classify
            }))
        }
    };

    const handleDecrease = (item: CartItemModel, isSlectedRow: boolean) => {
        if (item.quantity > 1) {
            if (loggedIn) mutateUpdateCartItem({ id: item.id, quantity: item.quantity - 1, classify: '' })
            else dispatch(updateLocalCart({ ...item, quantity: item.quantity - 1 }))
            if (isSlectedRow) dispatch(updateProductOrder({
                id: item.product.id,
                image: item.product.images?.[0],
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity - 1,
                classify: item.classify
            }))
        }
    };
    const handleRemove = (item: any) => {
        if (user.userId)
            removeMutate(item.id)
        else dispatch(removeCartItems([item.id]))
    }
    const onChangePage = (model: any) => {
        setPaginationModel({ page: model.page, limit: model.pageSize })
        dispatchAsyn(getListCartThunk({page: model.page, limit: model.pageSize, }))
    }
    const columns: GridColDef[] = [
        {
            field: 'images', headerName: '', flex: 0.7, renderCell: (params) => (
                <Box  >
                    <CardMedia
                        component="img"
                        image={params.row.product.images?.[0]}
                        loading="lazy"
                        sx={{
                            aspectRatio: "1/ 1", objectFit: "cover", objectPosition: 'center',
                            width: 50, height: 50, borderRadius: 1,
                        }}
                    />
                </Box>
            )
        },
        {
            field: 'name', headerName: 'Sản phẩm', flex: 2,
            renderCell: (params) => (
                <Typography sx={{ whiteSpace: "normal", wordBreak: "break-word" }} width={'100%'}>{params.row.product.name}</Typography>
            )
        },
        { field: 'classify', headerName: 'Phân loại', flex: 1, renderCell: (params) => <Box>{params.row.product.classify}</Box> },
        { field: 'price', headerName: 'Đơn giá', flex: 1, renderCell: (params) => <Box>{formatCurrency(params.row.product.price)}</Box> },
        {
            field: 'quantity', headerName: 'Số lượng', flex: 2,
            renderCell: (params) => {
                return <Stack direction="row" alignItems="center" spacing={2} paddingY={1}>
                    <IconButton 
                        onClick={() => handleDecrease(params.row, params.api.isRowSelected(params.id))}
                        disabled={params.row.quantity === 1}>
                        <MinusIcon height={16} width={16} />
                    </IconButton>
                    <TextField
                        value={params.row.quantity}
                        size="small"
                        sx={{ width: 60, textAlign: "center" }}
                        inputProps={{
                            style: { textAlign: "center" },
                            readOnly: true,
                        }}
                    />
                    <IconButton 
                        onClick={() => handleIncrease(params.row, params.api.isRowSelected(params.id))}
                        disabled={params.row.quantity === params.row.product.stock}
                    >
                        <PlusIcon height={16} width={16} />
                    </IconButton>
                </Stack>
            },
        },
        {
            field: 'totalPrice', headerName: 'Số tiền', flex: 1, renderCell: (params) => (
                <Box>{formatCurrency(params.row.product.price * params.row.quantity)}</Box>)
        },
        {
            field: "action",
            headerName: "", flex: 0.5,
            renderCell: (params) => (
                <Box>
                    <ButtonIcon iconComp={<TrashIcon />}
                        buttonProps={{ color: 'error',  }}
                        onClick={() => handleRemove(params.row)}
                    />

                </Box>
            ),
        },
    ];
    return (
        <Box >
            {loggedIn ? <TableBase
                paginationMode="server"
                rowCount={total}
                // loading={loading}
                onPaginationModelChange={onChangePage}
                paginationModel={{ page: paginationModel.page, pageSize: paginationModel.limit }}
                rows={cartUser}
                columns={columns}
                checkboxSelection
                rowHeight={80}
                sx={{
                    "& .MuiDataGrid-cell": {
                        display: "flex",
                        alignItems: "center", // căn giữa dọc khi row cao
                    },
                }}
                rowSelectionModel={{ type: 'include', ids: new Set(orderLocal?.map((i: any) => i.id)) }}
                onRowSelectionModelChange={onSelectedChange}
            /> :
                <TableBase
                    rows={cartLocal || []}
                    columns={columns}
                    checkboxSelection
                    rowSelectionModel={{ type: 'include', ids: new Set(orderLocal.map(i => i.id)) }}
                    onRowSelectionModelChange={onSelectedChange}
                    rowHeight={80}
                sx={{
                    "& .MuiDataGrid-cell": {
                        display: "flex",
                        alignItems: "center", // căn giữa dọc khi row cao
                    },
                }}
                />}

            <Stack sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                width: '100%',
            }}
                padding={2} boxShadow={2}  >
                <Container>
                    <Stack direction={'row'} alignItems={'center'} spacing={3}
                    >
                        <Typography flex={2} variant="subtitle1">{`Tổng cộng ${orderLocal?.length || 0} sản phẩm`}</Typography>

                        <Typography variant="h5" color="error">{formatCurrency(calTotalPriceSelected)}</Typography>
                        <Box flex={0.5}>
                            < ButtonBase
                                fullWidth size="large"
                                variant="contained"
                                onClick={(e) => onBuy()}
                                color="secondary">
                                {'Tiến hành đặt hàng'}
                            </ButtonBase>
                        </Box>
                    </Stack>

                </Container>

            </Stack>
        </Box>

    )
}