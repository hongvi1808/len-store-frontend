'use client'
import { orderApis } from "@/base/apis/order.api";
import { ListParams } from "@/base/models/common.model";
import { showAlertError, showAlertSuccess } from "@/base/ui/toaster";
import { formatPhone } from "@/base/utils/func";
import { AutocompleteBase } from "@/components/autocomplete/autocomplete-base.comp";
import { ButtonIconText } from "@/components/button/buton-iconText.comp";
import { ButtonIcon } from "@/components/button/button-icon.comp";
import TableBase from "@/components/table/table-base.comp";
import { ArrowRightStartOnRectangleIcon, EyeIcon, PencilSquareIcon, PlusIcon, QueueListIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Icon, Popover, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ProductListByOrderTable } from "./product-by-order.comp";
import { OrderModel } from "@/base/models/order.model";
import { orderStatusText } from "@/base/utils/constants";

export function OrderListForm() {
    const queryClient = useQueryClient();
    const [paginationModel, setPaginationModel] = useState<ListParams>({ page: 0, limit: 10 })
    const [item, setItem] = useState<OrderModel | null>(null);
    const [openDiag, setOpenDiag] = useState(false);
    const [openProductDiag, setOpenProductDiag] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    // QUERY
    const { isLoading, data } = useQuery({
        queryKey: ['admin-order', paginationModel],
        queryFn: async () => orderApis.getList(paginationModel),
    });
    // MUTATE
    const { mutate: createMutate, isPending: createPending } = useMutation({
        mutationFn: orderApis.create,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data) => {
            showAlertSuccess('Added a order!')
            onToggleDiaglog(null)
            queryClient.invalidateQueries({ queryKey: ['admin-order', paginationModel] });
        },
    });
    const { mutate: updateMutate, isPending: updatePending } = useMutation({
        mutationFn: orderApis.update,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data) => {
            showAlertSuccess('Updated a order!')
            onToggleDiaglog(null)
            queryClient.invalidateQueries({ queryKey: ['admin-order', paginationModel] });
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries())
        if (item) updateMutate({...data, id: item.id})
        else createMutate({data})
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
            field: 'customerInfo', headerName: 'Customer', flex: 1, renderCell: (params) =>
            (<Box>
                <Button aria-describedby={params.row.id} variant="text"
                    onClick={(event) => { setItem(params.row); setAnchorEl(event.currentTarget) }}
                    endIcon={<Icon><EyeIcon /></Icon>}
                >
                    {params.row.customerInfo.name}
                </Button>
                <Popover
                    id={params.row.id}
                    open={item?.id === params.row.id && Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => { setItem(null); setAnchorEl(null) }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Stack spacing={2} p={2}>
                        <Typography >{`Name: ${params.row.customerInfo.name}`}</Typography>
                        <Typography >{`Phone: ${formatPhone(params.row.customerInfo.phoneNumber)}`}</Typography>
                        <Typography >{`Email: ${params.row.customerInfo.email}`}</Typography>
                        <Typography >{`Address: ${params.row.customerInfo.address}`}</Typography>

                    </Stack>
                </Popover>
            </Box>)
        },
        { field: 'totalPrice', headerName: 'Total', flex: 1 },
        { field: 'createdAt', headerName: 'Created At', flex: 1 },
        {
            field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => (
                <Chip
                    label={params.row.status}
                    color={params.row.status === 'Completed' ? "success" : "warning"}
                    size="medium"
                    variant={params.row.status === 'Completed' ? "filled" : "outlined"}
                />
            ),
        },
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
                    {/* <ButtonIcon iconComp={<TrashIcon />}
                        buttonProps={{ color: 'error', loading: removePending }}
                        onClick={() => removeMutate(params.row.id)} /> */}

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
                       <AutocompleteBase<any, false>
                                                   label="Status"
                                                   default={item?.status}
                                                   name="status"
                                                   selectProps={{
                                                       options: [...orderStatusText].map(([key, value]) => (key)),
                                                       renderInput: (param) => <></>,
                                                    //    defaultValue: 'other'
                                                   }}
                                               />
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