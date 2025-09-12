'use client'
import { categoryApis } from "@/base/apis/category.api";
import { customerMenu } from "@/base/utils/config";
import { Box, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { motion, useDragControls } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
export function CategoryBubbleSection() {
    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null);
    const dragControls = useDragControls();
    const { data, isLoading } = useQuery({
        queryKey: ['all-category-name'],
        queryFn: () => categoryApis.getList({ page: 0, limit: 100 }),
    })
    return (
        <Box overflow={'hidden'} height={'80vh'}>
            <Box ref={ref} position={'relative'} width={'100%'} height={400}  >

                {data?.items?.map((item: any) =>

                    <Box onClick={() => router.push(`/${item.tag}/${item.slug}`)}
                        position={'absolute'}
                        width={80} height={80}
                        borderRadius={'50%'}
                        sx={{
                            background:
                                //  "radial-gradient(circle at 30% 30%, hsl(0, 92%, 90%), hsl(0, 92%, 70%))",
                                "radial-gradient(circle at 30% 30%,  #feca57, #ff6b6b)",
                            cursor: 'pointer',
                        }}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        component={motion.div}
                        boxShadow={1}
                        key={item.id}
                        initial={{ x: Math.random() * (window.innerWidth - 12), y: Math.random() * (400 - 12), }}
                        animate={{
                            x: Array.from({ length: 10 }, () => Math.random() * (window.innerWidth - 100)),
                            y: Array.from({ length: 10 }, () => Math.random() * (400 - 100)),
                            scale: Array.from({ length: 10 }, () => Math.random() * 1 + 0.8),
                        }}
                        transition={{
                            duration: 120,
                            repeat: Infinity,
                            ease: "linear",

                        }}
                        drag
                        dragConstraints={ref}
                        dragControls={dragControls}
                    >
                        <Typography textAlign={'center'}
                            key={item.id} p={1}
                            fontSize={12}
                            color={'hsl(0, 70%, 30%)'}
                        >
                            {item.name}
                        </Typography>
                    </Box>

                )}

            </Box>
            <Stack direction={'row'} alignItems={'center'} spacing={2} px={{ sm: 2, md: 6, lg: 10 }}
                sx={{ position: 'absolute', bottom: '-10vh', left: 0, right: 0,   }}>

                {customerMenu?.map((item, index) => (
                    <Stack key={index} flex={1} component={Link} href={item.href}
                    spacing={2} alignItems={'center'}
                        sx={{
                            bgcolor: "white",
                            height: '20vh',
                            p: 2,
                             boxShadow: 3, borderRadius: 2,
                              alignItems: 'center', justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h5" textAlign={'center'}>
                            {item.title}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" textAlign={'center'}>
                            {item.despcription}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Box>
    )
}