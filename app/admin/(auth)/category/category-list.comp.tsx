'use client'
import { categoryApis } from "@/base/apis/category.api";
import { CategoryModel } from "@/base/models/category.model";
import { ListParams } from "@/base/models/common.model";
import { showAlertError, showAlertSuccess } from "@/base/ui/toaster";
import { validRequire } from "@/base/utils/func";
import { AutocompleteBase } from "@/components/autocomplete/autocomplete-base.comp";
import { ButtonIconText } from "@/components/button/buton-iconText.comp";
import { ButtonIcon } from "@/components/button/button-icon.comp";
import TableBase from "@/components/table/table-base.comp";
import { TextFiledControlBase } from "@/components/textfield/textfield.comp";
import { ArrowRightStartOnRectangleIcon, PencilSquareIcon, PlusIcon, QueueListIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ProductListByCategoryTable } from "./product-by-category";

export function CategoryListForm() {
    const queryClient = useQueryClient();
    const [paginationModel, setPaginationModel] = useState<ListParams>({ page: 0, limit: 10 })
    const [item, setItem] = useState<CategoryModel | null>(null);
    const [openDiag, setOpenDiag] = useState(false);
    const [openProductDiag, setOpenProductDiag] = useState(false);
    // QUERY
    const { isLoading: categoryLoading, data: categories } = useQuery({
        queryKey: ['admin-category', paginationModel],
        queryFn: async () => categoryApis.getList(paginationModel),
    });
    // MUTATE
    const { mutate: removeMutate, isPending: removePending } = useMutation({
        mutationFn: categoryApis.remove,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)
        },
        onSuccess: (data) => {
            showAlertSuccess('Deleted a category!')
            queryClient.refetchQueries({ queryKey: ['admin-category', paginationModel] });
        },
    });
    const { mutate: createMutate, isPending: createPending } = useMutation({
        mutationFn: categoryApis.create,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data) => {
            showAlertSuccess('Added a category!')
            onToggleDiaglog(null)
            queryClient.invalidateQueries({ queryKey: ['admin-category', paginationModel] });
        },
    });
    const { mutate: updateMutate, isPending: updatePending } = useMutation({
        mutationFn: categoryApis.update,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data) => {
            showAlertSuccess('Updated a category!')
            onToggleDiaglog(null)
            queryClient.invalidateQueries({ queryKey: ['admin-category', paginationModel] });
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries())
        if (item) updateMutate({ ...data, id: item.id })
        else createMutate(data)
    }
    const onToggleDiaglog = (selectedItem: CategoryModel | null) => {
        setItem(selectedItem)
        setOpenDiag(!openDiag)
    }
    const onToggleProductListDiaglog = (selectedItem: CategoryModel | null) => {
        setItem(selectedItem)
        setOpenProductDiag(!openProductDiag)
    }
    const columns: GridColDef[] = [
        {
            field: 'order', headerName: 'Order', renderCell: (params) => (params.api.getRowIndexRelativeToVisibleRows(params.id) + 1)
        },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'tag', headerName: 'Tag', flex: 1 },
        {
            field: "action",
            headerName: "", flex: 2,
            renderCell: (params) => (
                <Box>
                    <ButtonIcon iconComp={<PencilSquareIcon height={20} width={20} />}
                        buttonProps={{ color: 'primary' }}
                        onClick={() => onToggleDiaglog(params.row)} />
                    <ButtonIcon iconComp={<QueueListIcon height={20} width={20} />}
                        buttonProps={{ color: 'secondary' }}
                        onClick={() => onToggleProductListDiaglog(params.row)} />
                    <ButtonIcon iconComp={<TrashIcon height={20} width={20} />}
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
                    iconComp={<PlusIcon height={20} width={20} />}
                    onClick={(() => onToggleDiaglog(null))}
                    title={'Add'}
                    buttonProps={{ size: 'medium' }}
                />
            </Stack>
            <TableBase
                paginationMode="server"
                rowCount={categories?.total || 0}
                loading={categoryLoading}
                onPaginationModelChange={(model) => setPaginationModel({ page: model.page, limit: model.pageSize })}
                paginationModel={{ page: paginationModel.page, pageSize: paginationModel.limit }}
                rows={categories?.items || []}
                columns={columns}
            />
            <Dialog fullWidth maxWidth={'md'} open={openDiag} onClose={() => onToggleDiaglog(null)}>
                <DialogTitle>{item? 'Update category': 'Add new category'}</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        id="add-category-form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}
                    >
                                <TextFiledControlBase
                                    name='name'
                                    label="Name*"
                                    inputProps={{ required: true }}
                                    getErrorMessage={validRequire}
                                />
                                <AutocompleteBase<string, false>
                                options={['good', 'hot', 'new']}
                                label="Role"
                                name="role"
                                defaultValue={'good'}
                                renderInput={(param) => <></>}
                            />

                    </Box>
                </DialogContent>
                <DialogActions sx={{ margin: 2 }} >
                    <ButtonIconText iconComp={<XMarkIcon height={20} width={20} />}
                        title="Cancel"
                        buttonProps={{ color: 'error', variant: 'outlined', size: 'medium' }}
                        onClick={() => onToggleDiaglog(null)}
                    />
                    <ButtonIconText
                        iconComp={<ArrowRightStartOnRectangleIcon height={20} width={20} />}
                        title="Submit"
                        buttonProps={{ type: "submit", size: 'medium', loading: item ? updatePending : createPending, form: 'add-category-form' }}
                    />
                </DialogActions>
            </Dialog>
            <ProductListByCategoryTable categoryId={item?.id || ''} openDiag={openProductDiag} onToggleDiag={() => onToggleProductListDiaglog(null)} />
        </Box>
    )
}