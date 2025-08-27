'use client';
import * as React from 'react';
import { ButtonBase } from './button-base.comp';
import { Box, ButtonProps, CardMedia, Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { uploadImages } from '@/base/cloudinary/cloudinary.service';
import { showAlertError } from '@/base/ui/toaster';

export interface IButtonUploadProps {
    onUrlChange: (url: string[]) => void;
    accept?: string; // Accept attribute for file input
    id: string; // ID for the file input
    title?: string
    buttonProps?: ButtonProps
    defaults?: string[];
    folderName?: string
}

export function ButtonUpload(props: IButtonUploadProps) {
    const [urlImages, setUrlImages] = React.useState<string[]>([])
    React.useEffect(() => {
        setUrlImages(props.defaults || [])
    }, [props.defaults])
const { mutate, isPending } = useMutation({
        mutationFn: uploadImages,
        onError: (error) => {
            console.error('Error calling api:', error);
            showAlertError(error.message)

        },
        onSuccess: (data: any[]) => {
            const urls = data?.map(i => i.secure_url)
            setUrlImages(urls)
            if (urls && props.onUrlChange) props.onUrlChange(urls);
        },
    });
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
        const files = event?.target.files;
        if (!files) return;
        mutate({files: Array.from(files), folderName: props.folderName})
        
    };
    return (
        <Stack direction={'row'} spacing={2}  >
            <input
                accept={props.accept || 'image/*'}
                id={props.id || 'upload-file'}
                type="file"
                hidden
                multiple
                onChange={(e) => handleFileChange(e)}
            />
            <label htmlFor={props.id || 'upload-file'}>
                <ButtonBase variant="contained" component="span" color="primary" loading={isPending} {...props.buttonProps}>
                    {props.title || 'Upload File'}
                </ButtonBase>
            </label>
            <Stack direction={'row'} spacing={1}>
            {!!urlImages?.length && urlImages?.map((i, idx) => (
                    <CardMedia key={idx}
                        component="img"
                        image={i}
                        loading="lazy"
                        sx={{ height: 60, width: 60, objectFit: "cover", borderRadius: 1, }}
                    /> ))}
                    </Stack>
        </Stack>
    );
}


