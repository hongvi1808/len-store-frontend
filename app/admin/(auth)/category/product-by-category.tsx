'use client'
import { productApis } from "@/base/apis/product.api";
import { ListParams } from "@/base/models/common.model";
import { showAlertError, showAlertSuccess } from "@/base/ui/toaster";
import { ButtonIconText } from "@/components/button/buton-iconText.comp";
import { ButtonIcon } from "@/components/button/button-icon.comp";
import TableBase from "@/components/table/table-base.comp";
import { TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface ProductListByCategoryProps {
    categoryId: string;
    openDiag: boolean
    onToggleDiag: () => void
}

export function ProductListByCategoryTable(props: ProductListByCategoryProps) {
    const queryClient = useQueryClient();
    const [paginationModel, setPaginationModel] = useState<ListParams>({ page: 0, limit: 10 })
    // QUERY
    const { isLoading, data } = useQuery({
        queryKey: ['admin-product-by-category', paginationModel, props.categoryId],
        queryFn: async () => productApis.getListByCategory(props.categoryId,paginationModel),
        enabled: !!props.categoryId
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
            queryClient.invalidateQueries({ queryKey: ['admin-product-by-category', paginationModel, props.categoryId] });
        },
    });

    const columns: GridColDef[] = [
        {
            field: 'order', headerName: 'Order', renderCell: (params) => (params.api.getRowIndexRelativeToVisibleRows(params.id) + 1)
        },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'stock', headerName: 'Stock', flex: 1 },
        { field: 'price', headerName: 'Price', flex: 1 },
        {
            field: "action",
            headerName: "", flex: 1,
            renderCell: (params) => (
                <Box>
                    <ButtonIcon iconComp={<TrashIcon  />}
                        buttonProps={{ color: 'error', loading: removePending }}
                        onClick={() => removeMutate(params.row.id)} />

                </Box>
            ),
        },
    ];
    return (
         <Dialog fullWidth maxWidth={'md'} open={props.openDiag} onClose={() => props.onToggleDiag()}>
                <DialogTitle>Products</DialogTitle>
                <DialogContent>
                     <Box>
            <TableBase
                paginationMode="server"
                rowCount={data?.total || 0}
                loading={isLoading}
                onPaginationModelChange={(model) => setPaginationModel({ page: model.page, limit: model.pageSize })}
                paginationModel={{ page: paginationModel.page, pageSize: paginationModel.limit }}
                rows={data?.items || []}
                columns={columns}
            />
        </Box>
                </DialogContent>
                <DialogActions sx={{ margin: 2 }} >
                    <ButtonIconText iconComp={<XMarkIcon  />}
                        title="Close"
                        buttonProps={{ color: 'info', variant: 'outlined', size: 'medium' }}
                        onClick={() => props.onToggleDiag()}
                    />
                </DialogActions>
            </Dialog>
       
    )
}