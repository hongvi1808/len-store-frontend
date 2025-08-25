import {  Paper, Stack, Typography } from "@mui/material"
import { ProductListForm } from "./product-list.comp";

export default function AdminProductPage() {
  return (
      <Stack direction={'column'} spacing={4} sx={{marginLeft: 2}}>
        <Typography component={'h1'} variant="h6">{'Product Management'}</Typography>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <ProductListForm />
        </Paper>
      </Stack>
  );
}
