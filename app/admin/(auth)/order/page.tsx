import {  Paper, Stack, Typography } from "@mui/material"
import { OrderListForm } from "./order-list.comp";

export default function AdminOrderPage() {
  return (
      <Stack direction={'column'} spacing={2} sx={{marginLeft: 2}}>
        <Typography component={'h1'} variant="h6">{'Order Management'}</Typography>
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
        <OrderListForm />
        </Paper>
      </Stack>
  );
}
