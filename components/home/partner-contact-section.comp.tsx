'use client'

import { Box,  Stack, Typography } from "@mui/material"
import { TextFiledControlBase } from "../textfield/textfield.comp"
import { ButtonBase } from "../button/button-base.comp"

export function PartnerContactSection() {
    return (
        <Stack spacing={{ sm: 4, md: 6, lg: 8 }} width={'100%'} alignItems={'center'} mb={8}   >
            <Stack width={'100%'} alignItems={'center'} spacing={4} >
                <Typography textAlign={'center'} width={{ sm: '90%', md: '70%', lg: '50%' }} variant="h2" textTransform={'uppercase'} >
                    {'Trở thành đối tác với LenStore'}
                </Typography>
                <Typography textAlign={'center'} width={{ sm: '80%', md: '60%', lg: '40%' }}
                    variant="subtitle1" color="#231f2099" >
                       
                    Kết nối với <span style={{
                        background: "linear-gradient(135deg, #60A5FA, #22D3EE, #A78BFA)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: '700',
                        whiteSpace: 'nowrap', width: 'auto'
                    }}>LenStore</span>, cùng phát triển và mang đến những sản phẩm thủ công độc đáo.
                </Typography>
            </Stack >
            <Box component={'form'} display={'flex'} width={{ sm: '80%', md: '60%', lg: '40%' }}
                justifyContent={'center'} alignItems={'center'} gap={2}>
                <TextFiledControlBase name={'contact'} inputProps={{ placeholder: 'Nhập SĐT hoặc email...', size: 'medium' }} />
                <ButtonBase color="secondary"
                    variant="contained" size="large"
                >
                    {'Gửi'}
                </ButtonBase>
            </Box>
        </Stack>
    )
}