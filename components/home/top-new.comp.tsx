'use client'
import { useRef } from "react";
import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import { useScroll, motion, useTransform } from "framer-motion";
 const mockupNew = [
    {
        id: 1,
        title: "Sản phẩm 1",
        image: "/images/banner1.jpg",
        description: "Mô tả sản phẩm 1",
    },
    {
        id: 1,
        title: "Sản phẩm 1",
        image: "/images/banner1.jpg",
        description: "Mô tả sản phẩm 1",
    },
    {
        id: 1,
        title: "Sản phẩm 1",
        image: "/images/banner1.jpg",
        description: "Mô tả sản phẩm 1",
    },
    {
        id: 1,
        title: "Sản phẩm 1",
        image: "/images/banner1.jpg",
        description: "Mô tả sản phẩm 1",
    },

]

export function TopNewSection() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef, // theo dõi section này
        offset: ["start start", "end end"],
    });

    // Map tiến trình scroll dọc thành dịch chuyển ngang
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
    return (
        <Box
            ref={sectionRef}
            sx={{
                position: "relative",
                height: "150vh", // cao gấp đôi viewport để có chỗ cuộn
                bgcolor: "#f0f0f0",
            }}
        >
            <Stack spacing={{ sm: 4, md: 6, lg: 8 }} alignItems={'center'} sx={{
                position: "sticky",
                top: 0,
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden", width: '100%'
            }} >
                <Stack width={'100%'} alignItems={'center'} spacing={1} >

                    <Typography variant="caption" color="textSecondary" >
                        {'/new-arrival'}
                    </Typography>
                    <Typography textAlign={'center'} width={'50%'} variant="h2" textTransform={'uppercase'} >
                        {'Những mẫu thủ công mới nhất của chúng tôi'}
                    </Typography>
                </Stack>
                    <Box gap={2} 
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        >

                        {mockupNew.map((item, index) => (
                        <motion.div key={index} style={{ x }}>
                            <Box
                                key={index} sx={{
                                    width: "60vh", display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "60vh",
                                }}
                            >
                                <CardMedia component="img"
                                    image={item.image}
                                    sx={{
                                        aspectRatio: "1/ 1",
                                        objectFit: "cover",
                                        objectPosition: 'center',
                                        width: '60vh', height: '60vh'

                                    }}
                                />
                            </Box>
                        </motion.div>
                        ))}
                    </Box>
            </Stack>
        </Box>
    )
}