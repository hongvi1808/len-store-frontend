import { Box,  Stack, Typography } from "@mui/material";
import { ButtonBack } from "@/components/button/button-back.comp";
import { AdminLoginForm } from "./admin-login-form.comp";

export default function AdminLogin() {
  
  return (
    <Stack spacing={4} sx={{ justifyContent: "center", padding: 2, }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <ButtonBack />
        <Typography
          component="h1"
          variant="h4"
          textAlign={'center'}
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          {'Log in'}
        </Typography>
      </Box>
      <AdminLoginForm />
    </Stack>
  )
}