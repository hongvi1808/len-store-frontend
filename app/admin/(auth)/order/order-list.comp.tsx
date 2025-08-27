'use client'
import { categoryApis } from "@/base/apis/category.api";
import { orderApis } from "@/base/apis/order.api";
import { productApis } from "@/base/apis/product.api";
import { ListParams } from "@/base/models/common.model";
import { ProductModel } from "@/base/models/product.model";
import { showAlertError, showAlertSuccess } from "@/base/ui/toaster";
import { validRequire } from "@/base/utils/func";
import { AutocompleteBase } from "@/components/autocomplete/autocomplete-base.comp";
import { ButtonIconText } from "@/components/button/buton-iconText.comp";
import { ButtonIcon } from "@/components/button/button-icon.comp";
import TableBase from "@/components/table/table-base.comp";
import { TextFiledControlBase } from "@/components/textfield/textfield.comp";
import { ArrowRightStartOnRectangleIcon, PencilSquareIcon, PlusIcon, QueueListIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Box, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ProductListByOrderTable } from "./product-by-order.comp";
import { OrderModel } from "@/base/models/order.model";
import { userApis } from "@/base/apis/user.api";

export function OrderListForm() {
    const queryClient = useQueryClient();
    const [paginationModel, setPaginationModel] = useState<ListParams>({ page: 1, limit: 10 })
    const [item, setItem] = useState<OrderModel | null>(null);
    const [openDiag, setOpenDiag] = useState(false);
    const [openProductDiag, setOpenProductDiag] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState<string[]>([])
    // QUERY
    const { isLoading, data } = useQuery({
        queryKey: ['admin-order', paginationModel],
        queryFn: async () => orderApis.getList(paginationModel),
    });
    const { isLoading: productLoading, data: products } = useQuery({
        queryKey: ['admin-product-order-select', { page: 0, limit: 100 }],
        queryFn: async () => productApis.getList({ page: 0, limit: 100 }),
    });
    const { isLoading: userLoading, data: users } = useQuery({
        queryKey: ['admin-user-order-select', { page: 0, limit: 100 }],
        queryFn: async () => userApis.getListCustomer({ page: 0, limit: 100 }),
    });
    // MUTATE
    const { mutate: removeMutate, isPending: removePending } = useMutation({
        mutationFn: productApis.remove,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)
        },
        onSuccess: (data) => {
            showAlertSuccess('Deleted a product!')
            queryClient.invalidateQueries({ queryKey: ['admin-product', paginationModel] });
        },
    });
    const { mutate: createMutate, isPending: createPending } = useMutation({
        mutationFn: productApis.create,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data) => {
            showAlertSuccess('Added a product!')
            onToggleDiaglog(null)
            queryClient.invalidateQueries({ queryKey: ['admin-product', paginationModel] });
        },
    });
    const { mutate: updateMutate, isPending: updatePending } = useMutation({
        mutationFn: productApis.update,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data) => {
            showAlertSuccess('Updated a product!')
            onToggleDiaglog(null)
            queryClient.invalidateQueries({ queryKey: ['admin-product', paginationModel] });
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries())
        // if (item) updateMutate({ ...data, id: item.id, categoryIds: selectedCategory })
        // else createMutate({ ...data, categoryIds: selectedCategory })
    }
    const onToggleDiaglog = (selectedItem: OrderModel | null) => {
        setItem(selectedItem)
        setOpenDiag(!openDiag)
    }
    const onToggleProductListDiaglog = (selectedItem: OrderModel | null) => {
        setItem(selectedItem)
        setOpenProductDiag(!openProductDiag)
    }
    const columns: GridColDef[] = [
        {
            field: 'order', headerName: 'Order', renderCell: (params) => (params.api.getRowIndexRelativeToVisibleRows(params.id) + 1)
        },
        { field: 'code', headerName: 'Code', flex: 1 },
        {
            field: 'customer', headerName: 'Customer', flex: 1, renderCell: (params) =>
                (params.row?.customerId ? (users?.items || [])?.find((i: any) => i.id === params.row.customerId) : 'Retail')
        },
        { field: 'totalPrice', headerName: 'Total', flex: 1 },
        { field: 'createdAt', headerName: 'Created At', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => (
                <Chip
                    label={params.row.status}
                    color={params.row.status === 'Completed' ? "success" : "warning"}
                    size="medium"
                    variant={params.row.status === 'Completed' ? "filled" : "outlined"}
                />
            ), },
        {
            field: "action",
            headerName: "", flex: 1,
            renderCell: (params) => (
                <Box>
                    <ButtonIcon iconComp={<PencilSquareIcon />}
                        buttonProps={{ color: 'primary' }}
                        onClick={() => onToggleDiaglog(params.row)} />
                    <ButtonIcon iconComp={<QueueListIcon />}
                        buttonProps={{ color: 'secondary' }}
                        onClick={() => onToggleProductListDiaglog(params.row)} />
                    <ButtonIcon iconComp={<TrashIcon />}
                        buttonProps={{ color: 'error', loading: removePending }}
                        onClick={() => removeMutate(params.row.id)} />

                </Box>
            ),
        },
    ];
    return (
        <Box>
            <Stack direction={'row'} spacing={2} justifyContent={'flex-end'} sx={{ marginLeft: 2, marginBottom: 2 }}>
                <ButtonIconText
                    iconComp={<PlusIcon />}
                    onClick={(() => onToggleDiaglog(null))}
                    title={'Add'}
                    buttonProps={{ size: 'medium' }}
                />
            </Stack>
            <TableBase
                paginationMode="server"
                rowCount={data?.total || 0}
                loading={isLoading}
                onPaginationModelChange={(model) => setPaginationModel({ page: model.page, limit: model.pageSize })}
                paginationModel={{ page: paginationModel.page, pageSize: paginationModel.limit }}
                rows={data?.items || []}
                columns={columns}
            />
            <Dialog fullWidth maxWidth={'md'} open={openDiag} onClose={() => onToggleDiaglog(null)}>
                <DialogTitle>{item ? 'Update product' : 'Add new product'}</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        id="add-order-form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}
                    >
                        {/* <TextFiledControlBase
                                    name='customerId'
                                    label="Name*"
                                    inputProps={{ required: true, defaultValue: item?.name }}
                                    getErrorMessage={validRequire}
                                />
                                <AutocompleteBase<any, true>
                                    multiple
                                    // required
                                    options={categories?.items || []}
                                    label="Category"
                                    default={categories?.items.filter((i: any) => item?.categoryIds?.includes(i.id))}
                                    name="categoryIds"
                                    loading={categoryLoading}
                                    getOptionLabel={(op) => op.name}
                                    values={(value) => setSelectedCategory(value?.map((i: any) => i.id) || [])}
                                    renderInput={(param) => <></>}
                                />

                                <TextFiledControlBase
                                    name='stock'
                                    label="Stock*"
                                    getErrorMessage={validRequire}
                                    inputProps={{ required: true, type: 'number',defaultValue: item?.stock  }}
                                />
                                <TextFiledControlBase
                                    name='price'
                                    label="Price*"
                                    getErrorMessage={validRequire}
                                    inputProps={{ required: true, type: 'number', defaultValue: item?.price }}
                                />
                                <TextFiledControlBase
                                    name='description'
                                    label="Description*"
                                    getErrorMessage={validRequire}
                                    inputProps={{multiline: true, rows: 4, required: true,defaultValue: item?.description}}
                                /> */}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ margin: 2 }} >
                    <ButtonIconText iconComp={<XMarkIcon />}
                        title="Cancel"
                        buttonProps={{ color: 'error', variant: 'outlined', size: 'medium' }}
                        onClick={() => onToggleDiaglog(null)}
                    />
                    <ButtonIconText
                        iconComp={<ArrowRightStartOnRectangleIcon />}
                        title="Submit"
                        buttonProps={{ type: "submit", size: 'medium', loading: item ? updatePending : createPending, form: 'add-order-form' }}
                    />
                </DialogActions>
            </Dialog>
            <ProductListByOrderTable orderId={item?.id || ''} openDiag={openProductDiag} onToggleDiag={() => onToggleProductListDiaglog(null)} />
        </Box>
    )
}