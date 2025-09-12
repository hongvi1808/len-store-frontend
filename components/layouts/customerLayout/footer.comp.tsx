"use client";

import { brand, gray } from "@/base/ui/themePrimitive";
import { customerMenu } from "@/base/utils/config";
import { AtSymbolIcon, GiftTopIcon, PhoneIcon } from "@heroicons/react/16/solid";
import { Box, Container, Stack, Typography, Link, Icon, Divider, CardMedia, Button } from "@mui/material";

const footerLinks = {
  OVERVIEW: [
    { title: 'Trang chủ', href: '/' },
    { title: 'Sản phẩm', href: '/handmade/all' },
    { title: 'Blog', href: '/blog' },
    { title: 'Liên hệ', href: '/contact' },

  ],
  TAGS: customerMenu,
  ECOMMERCE: [
    { title: 'Giỏ hàng', href: '/cart' },
    { title: 'Đơn hàng', href: '/order' },
  ],
};

export default function Footer() {
  const getTtile = (key: string) => {
    switch (key) {
      case 'OVERVIEW': return 'Tổng quan';
      case 'TAGS': return 'Phân mục SP';
      case 'ECOMMERCE': return 'Bán hàng';
      default: return key;
    }
  }
  return (
    <Box component="footer" sx={{ bgcolor: gray[50], color: gray[900], pt: 6, }}>
      <Container maxWidth="lg" >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={6}
          justifyContent="space-between"
        >
          {/* Logo + Copyright */}
          <Stack spacing={2} width={{ xs: "100%", md: "30%" }}>
            <Stack borderRadius={1} direction="row" alignItems="center" justifyContent={'flex-start'}>
              <Icon sx={{ justifyContent: 'center', alignContent: 'center', color: '#22D3EE', height: 24, width: 24 }} >
                <GiftTopIcon height={24} width={24} />
              </Icon>
              <Typography
                variant="h4"
                sx={{
                  background: "linear-gradient(135deg, #60A5FA, #22D3EE, #A78BFA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                  lineHeight: 1,
                }}
              >
                {'LenStore'}
              </Typography>
            </Stack>
            <Typography variant="body2" color="grey.500">
              Nâng niu từng sản phẩm, trao gửi trọn yêu thương đến mỗi khách hàng.
            </Typography>
            <Box>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Icon ><PhoneIcon color="grey" /></Icon>
                <Typography variant="body2" color="grey.500">
                  0374393553
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Icon><AtSymbolIcon color="grey" /></Icon>
                <Typography variant="body2" color="grey.500">
                  vivo74513@gmail.com
                </Typography>
              </Stack>
            </Box>

          </Stack>

          {/* Menu */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 4, sm: 8 }}
          >
            {Object.entries(footerLinks).map(([title, links]) => (
              <Stack key={title} spacing={1}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ letterSpacing: 1 }}
                >
                  {getTtile(title)}
                </Typography>
                {links.map((obj) => (
                  <Link
                    key={obj.href}
                    href={obj.href}
                    underline="none"
                    sx={{
                      fontSize: "0.875rem",
                      "&:hover": { color: brand[400] },
                    }}
                  >
                    {obj.title}
                  </Link>
                ))}
              </Stack>
            ))}
            <Stack spacing={1}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                sx={{ letterSpacing: 1 }}
              >
                Cộng đồng
              </Typography>
              <Link
                href={''}
                underline="none"
                sx={{
                  fontSize: "0.875rem",
                  "&:hover": { color: brand[400] },
                }}
              >
              </Link>
              <Stack direction={'row'} spacing={2}>
                <CardMedia component="img"
                  image={'/images/facebook.png'}
                  sx={{
                    aspectRatio: "1/ 1",
                    objectFit: "contain",
                    objectPosition: 'center',
                    width: 24,
                  }}
                />
                <CardMedia component="img"
                  image={'/images/tiktok.png'}
                  sx={{
                    aspectRatio: "1/ 1",
                    objectFit: "contain",
                    objectPosition: 'center',
                    width: 24,
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Box mt={3} py={2}>


          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://your-site.com/" target="_blank" rel="noopener">
              {'Len Store'}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
