import {  Paper, Stack, Typography } from "@mui/material"
import { CategoryListForm } from "./category-list.comp";

export default function AdminCategoryPage() {
  return (
      <Stack direction={'column'} spacing={1} sx={{marginLeft: 2}}>
        <Typography component={'h1'} variant="h6">{'Category Management'}</Typography>
        <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
        <CategoryListForm />
        </Paper>
      </Stack>
  );
}
