import { Box,  Divider, Link, Stack, Typography } from "@mui/material";
import { CustomerRegisterForm } from "./register-form.comp";
import { ButtonBack } from "@/components/button/button-back.comp";
import { brand } from "@/base/ui/themePrimitive";

export default function Register() {
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
          {'Đăng ký tài khoản'}
        </Typography>
        <CustomerRegisterForm/>
      </Box>
      <Divider>
        <Typography sx={{ color: 'text.secondary' }}>or</Typography>
      </Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography sx={{ textAlign: 'center' }}>
          {"Bạn đã có tài khoản?"}
          <Link
            href="/login"
            variant="body2"
            sx={{ alignSelf: 'center', ml: 1, color: brand[500], textDecoration: 'underline' }}
          >
            {'Đăng nhập'}
          </Link>
        </Typography>
      </Box>
    </Stack>
  )
}