'use client'
import { categoryApis } from "@/base/apis/category.api";
import { productApis } from "@/base/apis/product.api";
import { ListParams } from "@/base/models/common.model";
import { ProductModel } from "@/base/models/product.model";
import { showAlertError, showAlertSuccess } from "@/base/ui/toaster";
import { validRequire } from "@/base/utils/func";
import { AutocompleteBase } from "@/components/autocomplete/autocomplete-base.comp";
import { ButtonIconText } from "@/components/button/buton-iconText.comp";
import { ButtonIcon } from "@/components/button/button-icon.comp";
import { ButtonUpload } from "@/components/button/button-upload.comp";
import TableBase from "@/components/table/table-base.comp";
import { TextFiledControlBase } from "@/components/textfield/textfield.comp";
import { ArrowRightStartOnRectangleIcon, PencilSquareIcon, PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function ProductListForm() {
    const queryClient = useQueryClient();
    const [paginationModel, setPaginationModel] = useState<ListParams>({ page: 1, limit: 10 })
    const [item, setItem] = useState<ProductModel | null>(null);
    const [openDiag, setOpenDiag] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([])
    const [urlImage, setUrlImages] = useState<string[]>([])
    // QUERY
    const { isLoading, data } = useQuery({
        queryKey: ['admin-product', paginationModel],
        queryFn: async () => productApis.getList(paginationModel),
    });
    const { isLoading: categoryLoading, data: categories } = useQuery({
        queryKey: ['admin-category-select', { page: 0, limit: 100 }],
        queryFn: async () => categoryApis.getList({ page: 0, limit: 100 }),
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
        if (!urlImage?.length) { showAlertError('Please add image product'); return;}
        if (item) updateMutate({ ...data, id: item.id, categoryIds: selectedCategory, images: urlImage })
        else createMutate({ ...data, categoryIds: selectedCategory, images: urlImage })
    }
    const onToggleDiaglog = (selectedItem: ProductModel | null) => {
        if (selectedItem) setUrlImages(selectedItem.images)
        setItem(selectedItem)
        setOpenDiag(!openDiag)
    }
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
                    <ButtonIcon iconComp={<PencilSquareIcon />}
                        buttonProps={{ color: 'primary' }}
                        onClick={() => onToggleDiaglog(params.row)} />
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
                        id="add-product-form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}
                    >
                        <ButtonUpload
                            id='images'
                            defaults={urlImage}
                            title="Add Images"
                            onUrlChange={(urls) => setUrlImages( urls)}
                        />
                        <TextFiledControlBase
                            name='name'
                            label="Name*"
                            inputProps={{ required: true, defaultValue: item?.name }}
                            getErrorMessage={validRequire}
                        />

                        <AutocompleteBase<any, true>
                            label="Category"
                            // default={categories?.items.filter((i: any) => item?.categoryIds?.includes(i.id))}
                            name="categoryIds"
                            values={(value) => setSelectedCategory(value?.map((i: any) => i.id) || [])}
                            selectProps={{
                                multiple: true, 
                                options:categories?.items || [],
                                renderInput: (param) => <></>,
                                getOptionLabel:(op) => op.name,
                                isOptionEqualToValue: (option, v) => option.id === v.id,
                                loading: categoryLoading,
                                defaultValue: categories?.items.filter((i: any) => item?.categoryIds?.includes(i.id))
                             }}
                        />


                        <TextFiledControlBase
                            name='stock'
                            label="Stock*"
                            getErrorMessage={validRequire}
                            inputProps={{ required: true, type: 'number', defaultValue: item?.stock }}
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
                            inputProps={{ multiline: true,minRows:5,maxRows:10, required: true, defaultValue: item?.description }}
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
                        buttonProps={{ type: "submit", size: 'medium', loading: item ? updatePending : createPending, form: 'add-product-form' }}
                    />
                </DialogActions>
            </Dialog>
        </Box>
    )
}