"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

export  function ContactForm() {
  return (
    <Box
      sx={{
        // position: "relative",
        // color: "white",
        width: "80%",
        bgcolor: 'white',
      }}
    >

      <Container>
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          sx={{ mb: 6 }}
        >
          Liên hệ với chúng tôi
        </Typography>

        <Grid container spacing={6} alignItems="stretch">
          {/* Map */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "100%",
                minHeight: 350,
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.005545634331!2d105.84117151540215!3d21.03193409306605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abdfd8b5c3f9%3A0x123456789abcdef!2zSGFub2kgTm9p!5e0!3m2!1sen!2s!4v1678283928717!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </Box>
          </Grid>

          {/* Contact form */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: "white",
                color: "black",
                borderRadius: 3,
                p: 4,
                boxShadow: 4,
              }}
            >
              <Stack spacing={3}>
                <TextField
                  label="Họ và tên"
                  required
                  fullWidth
                />
                <TextField
                  label="Email"
                  type="email"
                  required
                  fullWidth
                />
                <TextField
                  label="Nội dung"
                  multiline
                  rows={4}
                  required
                  fullWidth
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#0d47a1",
                    borderRadius: "30px",
                    py: 1.5,
                    "&:hover": { bgcolor: "#08306b" },
                  }}
                >
                  Gửi thông tin
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
