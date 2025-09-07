import { Box, Container, Typography } from "@mui/material";
import { OrderCustomerForm } from "./order-form.comp";

export default function OrderPage() {
  return <Container >
    <Typography paddingY={2} variant="h4" color="primary">{'Đặt hàng và thanh toán'}</Typography>
    <OrderCustomerForm/>
  </Container>
}
