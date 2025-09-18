import { Container, Typography } from "@mui/material";
import { OrderCustomerForm } from "./order-form.comp";

export default function OrderPage() {
  return <Container >
    <Typography paddingY={2} variant="h4" color="primary">{'Lịch sử đơn hàng'}</Typography>
    <OrderCustomerForm/>
  </Container>
}
