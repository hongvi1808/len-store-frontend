import { Box,  Stack } from "@mui/material";

export default function AdminDashboard() {
  return (
     <Box
          component="main"
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            {'Dashboard'}
          </Stack>
        </Box>
  )
}