import { Accordion, AccordionDetails, AccordionSummary, Box, Radio, Stack, Typography } from "@mui/material";
import { useState } from "react";

type PaymentInfoProps = {
    getOptionSelect: (value: string) => void
}

const paymentMethod = [{
    method: 'Cod', name: 'Thanh toán khi nhận hàng', content: <Typography variant="body2" color="textSecondary">{'Thanh toán cho shipper khi nhận hàng'}</Typography>
},
{
    method: 'Bank_Transfer', name: 'Chuyển khoản', content: <Stack spacing={1} ml={3}>
        <Typography variant="body2" color="textSecondary">{'Hãy thực hiện chuyển khoản theo thông tin sau!'}</Typography>
        <Typography variant="body2" color="textSecondary">{'Nội dung: Tên + SĐT'}</Typography>
        <Typography  variant="body2" color="textSecondary">{'Chủ tài khoản: VTHV'}</Typography>
        <Typography  variant="body2" color="textSecondary">{'BIDV: 3143464824'}</Typography>
        <Typography  variant="body2" color="textSecondary">{'Momo: 0374393553'}</Typography>
    </Stack>
}]
export function PaymentInfo(props: PaymentInfoProps) {
    const [selected, setSelected] = useState<string | false>();

    const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
        setSelected(isExpanded ? panel : false);
        props.getOptionSelect(panel)
    };
    return (
        <Box sx={{ width: 400, margin: "0 auto" }}>
            {paymentMethod.map(item => 
            <Accordion key={item.method} expanded={selected === item.method} onChange={handleChange(item.method)}>
                <AccordionSummary  >
                    <Box display={'flex'} alignItems={'center'}>

                        <Radio checked={selected === item.method} />
                    <Typography>{item.name}</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    {item.content}
                </AccordionDetails>
            </Accordion> )}
        </Box>
    )
}