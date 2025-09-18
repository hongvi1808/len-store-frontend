import {  Container, Typography } from "@mui/material";
import { CheckoutForm } from "./checkout-form.comp";

export default function CheckoutPage() {
  return <Container >
    <Typography paddingY={2} variant="h4" color="primary">{'Đặt hàng và thanh toán'}</Typography>
    <CheckoutForm/>
  </Container>
}
