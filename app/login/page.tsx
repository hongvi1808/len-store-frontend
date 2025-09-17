import { Box,  Divider, Icon, Link, Stack, Typography } from "@mui/material";
import { ButtonBase } from "@/components/button/button-base.comp";
import NextLink from "next/link";
import { DevicePhoneMobileIcon, EnvelopeIcon } from "@heroicons/react/16/solid";
import { ButtonBack } from "@/components/button/button-back.comp";
import { CustomerLoginForm } from "./login-form.comp";
import { brand } from "@/base/ui/themePrimitive";

export default function Login() {
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
        <CustomerLoginForm/>
        
        <Typography sx={{ textAlign: 'center' }}>
          {"Bạn chưa có tài khoản? "}
          <Link
            href="/register"
            variant="body2"
            sx={{ alignSelf: 'center', ml: 1, color: brand[500], textDecoration: 'underline' }}
          >
            {'Đăng ký'}
          </Link>
        </Typography>
    </Stack>
  )
}