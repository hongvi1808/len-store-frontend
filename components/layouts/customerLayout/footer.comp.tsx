import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

export default function Footer() {
    return (
         <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://your-site.com/" target="_blank" rel="noopener">
            {'Len Store'}
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
    );
}