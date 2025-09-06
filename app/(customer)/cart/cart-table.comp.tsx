'use client'
import { cartApis } from "@/base/apis/cart.api";
import { CartItemModel } from "@/base/models/cart.model";
import { ListParams } from "@/base/models/common.model";
import { showAlertError } from "@/base/ui/toaster";
import { formatCurrency, getCartLocal, removeItemCartLocal, setCartLocal } from "@/base/utils/func";
import { ButtonBase } from "@/components/button/button-base.comp";
import { ButtonIcon } from "@/components/button/button-icon.comp";
import TableBase from "@/components/table/table-base.comp";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { AppBar, Box, CardMedia, Container, Drawer, IconButton, Stack, TextField, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface CartTableProps {
    customerId: string;
}

export function CartTableComp(props: CartTableProps) {
    const queryClient = useQueryClient();
    const router = useRouter()
    const cartLocal = getCartLocal()
    const [paginationModel, setPaginationModel] = useState<ListParams>({ page: 0, limit: 10 })
    const [selected, setSelected] = useState<CartItemModel[]>([])
    const [rows, setRows] = useState<CartItemModel[]>(cartLocal || [])
    // QUERY
    const { isLoading, data } = useQuery({
        queryKey: ['cart-table-customer', paginationModel, props.customerId],
        queryFn: async () => cartApis.getList({ ...paginationModel, customerId: props.customerId }),
        enabled: !!props.customerId
    });
    useEffect(() => {
        if (data?.items ) setRows(data?.items || [])
    }, [data?.items])
    // MUTATE
    const { mutate: removeMutate, isPending: removePending } = useMutation({
        mutationFn: cartApis.remove,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['cart-table-customer', paginationModel, props.customerId] });
        },
    });
    const onBuy = () => {
        // viet sp vao redux
        router.push('/order')   
    }
    const onSelectedChange = (e: any) => {
        if (e.type === 'include') {
            const selectedData = rows.filter((row: any) => e.ids.has(row.id));
            setSelected(selectedData)
        }
        if (e.type === 'exclude' && !e.ids.size) setSelected(rows)
    }
    const calTotalPriceSelected = useMemo((): number => {
        return selected?.reduce((total, item) => total + item.product.price * item.quantity, 0) || 0;
    }, [selected])
    const handleIncrease = (item: CartItemModel) => {
        if (item.quantity < item.product.stock) {
            const updatedRow = { ...item, quantity: item.quantity + 1 };
            setRows((prev) =>
                prev.map((row) => (row.id === item.id ? updatedRow : row))
            );
        }
    };

    const handleDecrease = (item: CartItemModel) => {
        if (item.quantity > 1) {
            const updatedRow = { ...item, quantity: item.quantity - 1 };
            setRows((prev) =>
                prev.map((row) => (row.id === item.id ? updatedRow : row))
            );
        }
    };
    const handleRemove = (item: any) => {
        // update rows from redux
        if (props.customerId)
        removeMutate(item.id)
    else removeItemCartLocal(item)
    }
    const columns: GridColDef[] = [
        {
            field: 'name', headerName: 'Sản phẩm', flex: 2, renderCell: (params) => (
                <Stack spacing={1} direction={'row'} alignItems={'center'} >
                    <Box width={'15%'} >
                        <CardMedia
                            component="img"
                            image={params.row.product.images?.[0]}
                            loading="lazy"
                            sx={{ aspectRatio: "1/ 1", objectFit: "cover", objectPosition: 'center', borderRadius: 1, }}
                        />
                    </Box>
                    <Box>{params.row.product.name}</Box>
                </Stack>
            )
        },
        { field: 'classify', headerName: 'Phân loại', flex: 1, renderCell: (params) => <Box>{params.row.product.classify}</Box> },
        { field: 'price', headerName: 'Đơn giá', flex: 1 , renderCell: (params) => <Box>{formatCurrency(params.row.product.price)}</Box>},
        {
            field: 'quantity', headerName: 'Số lượng', flex: 2,
            renderCell: (params) => {
                return <Stack direction="row" alignItems="center" spacing={2} paddingY={1}>
                    <IconButton onClick={() => handleDecrease(params.row)} disabled={params.row.quantity === 1}>
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
                        onClick={() => handleIncrease(params.row)}
                        disabled={params.row.quantity === params.row.product.stock}
                    >
                        <PlusIcon height={16} width={16} />
                    </IconButton>
                </Stack>
            },
        },
        { field: 'totalPrice', headerName: 'Số tiền', flex: 1, renderCell: (params) => (
        <Box>{formatCurrency(params.row.product.price* params.row.quantity)}</Box>) },
        {
            field: "action",
            headerName: "", flex: 0.5,
            renderCell: (params) => (
                <Box>
                    <ButtonIcon iconComp={<TrashIcon />}
                        buttonProps={{ color: 'error', loading: removePending }}
                        onClick={() => handleRemove(params.row)}
                    />

                </Box>
            ),
        },
    ];
    return (
        <Box >

            <TableBase
                paginationMode="server"
                rowCount={data?.total || 0}
                loading={isLoading}
                onPaginationModelChange={(model) => setPaginationModel({ page: model.page, limit: model.pageSize })}
                paginationModel={{ page: paginationModel.page, pageSize: paginationModel.limit }}
                rows={rows || []}
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={onSelectedChange}
            />

            <Stack

                sx={{
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
                        <Typography flex={2} variant="subtitle1">{`Tổng cộng ${selected?.length || 0} sản phẩm`}</Typography>

                        <Typography variant="h5" color="error">{formatCurrency(calTotalPriceSelected)}</Typography>
                        <Box flex={0.5}>
                            < ButtonBase
                                fullWidth size="large"
                                variant="contained"
                                onClick={(e) => onBuy()}
                                color="secondary">
                                {'Mua hàng'}
                            </ButtonBase>
                        </Box>
                    </Stack>

                </Container>

            </Stack>
        </Box>

    )
}