import {  Paper, Stack, Typography } from "@mui/material"
import { CategoryListForm } from "./category-list.comp";

export default function AdminCategoryPage() {
  return (
      <Stack direction={'column'} spacing={4} sx={{marginLeft: 2}}>
        <Typography component={'h1'} variant="h6">{'Category Management'}</Typography>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <CategoryListForm />
        </Paper>
      </Stack>
  );
}
