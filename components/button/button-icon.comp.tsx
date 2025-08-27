'use client';
import {  ButtonProps, Icon } from '@mui/material';
import * as React from 'react';
import { ButtonBase } from './button-base.comp';

interface IButtonIconProps {
    iconComp: any
    onClick?: (e: any) => void
    buttonProps?: ButtonProps

}
export function ButtonIcon(props: IButtonIconProps) {
    return (
            <ButtonBase
                color='inherit'
                size={'small'}
                onClick={props.onClick}
                {...props.buttonProps}
            >
                <Icon sx={{ justifyContent: 'center', alignContent: 'center' }} >
                    {props.iconComp}
                </Icon>
            </ButtonBase>
    );
}


