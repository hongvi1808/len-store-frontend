'use client'
import { Box, CardMedia, Container, Divider, Stack } from "@mui/material";
import { motion } from "framer-motion";

export function DividerLineSection() {
    return (
        <Stack direction={'row'} spacing={2} justifyContent={'center'} alignItems={'center'}
            component={Container}
        >
            <Box flex={2}>

                <Divider variant="middle" sx={{ width: '100%', mx: 0 }} />
            </Box>
            <Box component={motion.div} initial={{ y: -15, x: -300, rotate: 0 }}
                transition={{
                    duration: 15,
                    times: [0, 0.3, 0.35, 0.65, 0.7, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: 'reverse'
                }}
                animate={{ y: [-15, -15, 0, 0, -15, -15], x: [-300, 0, 0, 0, 0, 0, 300], rotate: [360, 0, 360, 360, 0, 360] }}
            >
                <CardMedia component="img"
                    image={'/images/yarn.gif'}
                    sx={{
                        alignContent: 'center',
                        aspectRatio: "1/ 1",
                        objectFit: "contain",
                        objectPosition: 'center',
                        width: 40,
                    }}
                />
            </Box>
            <Box flex={2}>

                <Divider variant="middle" sx={{ width: '100%', mx: 0 }} />
            </Box>
        </Stack>
    )
}