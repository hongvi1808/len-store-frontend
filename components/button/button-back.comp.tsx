'use client';
import { Box, Button, ButtonProps, Icon } from '@mui/material';
import * as React from 'react';
import { ButtonBase } from './button-base.comp';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';

export function ButtonBack(props: ButtonProps) {
    const router = useRouter()
    return (
        <Box sx={{ flex: '0 0 auto', marginLeft: '-14px', }}>
            <ButtonBase
                onClick={() => router.back()}
                color='inherit'
                {...props}
            ><Icon sx={{ justifyContent: 'center', alignContent: 'center' }} >
                    <ArrowLeftIcon  color="primary" />
                </Icon></ButtonBase>
        </Box>
    );
}


