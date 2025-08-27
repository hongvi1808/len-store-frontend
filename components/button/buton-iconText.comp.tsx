'use client';
import { ButtonProps, Icon, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { ButtonBase } from './button-base.comp';

interface IButtonIconProps {
    iconComp: any
    title: string;
    onClick?: (e: any) => void
    buttonProps?: ButtonProps

}
export function ButtonIconText(props: IButtonIconProps) {
    return (
        <ButtonBase
            color='primary'
            variant='contained'
            size={'small'}
            onClick={props.onClick}
            {...props.buttonProps} >
                <Stack spacing={1} direction={'row'} alignItems={'center'}>
                <Icon sx={{ justifyContent: 'center', alignContent: 'center'}} >
                    {props.iconComp}
                </Icon>
                <Typography>{props.title}</Typography>
            </Stack>
            </ButtonBase>
    );
}


