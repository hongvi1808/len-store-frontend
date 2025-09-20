"use client";

import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from 'embla-carousel-fade'
import { Box, Stack, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { gray } from "@/base/ui/themePrimitive";
import { ButtonIconText } from "../button/buton-iconText.comp";
import { CursorArrowRaysIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const bannerImages = ['/images/banner1.jpg', '/images/banner2.jpg',   ]

export default function HeroBanner() {
    const router = useRouter()
    const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true, }, [Autoplay({ delay: 3000 }), Fade()]);
    const controls = useAnimation();

  useEffect(() => {
    async function runSequence() {
      await controls.start({
        visibility: 'visible',
        x: [300, 0],
        transition: { duration: 2 },
      });

      controls.start({
        scale:  [1,1.2,1],
        transition: { duration: 0.5,  ease: "linear", repeat: Infinity, repeatDelay: 3 },
      });
    }
    runSequence();
  }, [controls]);
    return (
        <Box
            ref={emblaRef}
            sx={{ overflow: 'hidden', position: 'relative', width: '100%', top: 0, left: 0, right: 0, height: '85vh' }}
        >
            <Box width={'100%'} height={'100%'} display={'flex'}>
                {bannerImages.map((slide, index) => (
                    <Box key={index} height={'100%'} width={'100%'}
                        position={'relative'} className={'flex-[0_0_100%]'}
                        sx={{
                            backgroundImage: `url(${slide})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            display: 'flex',
                        }}
                    >
                        <Box className="absolute inset-0 bg-black/40"></Box>
                        <Stack width={'100%'} className="z-10" alignItems={'center'} justifyContent={'center'} sx={{ color: 'white' }}>
                            <Stack direction={'row'} spacing={{ xs: 1, sm: 1.2, md:1.4, lg: 1.5 }} alignItems={'center'}>
                                {('Chào mừng bạn đến với').split("").map((char, i) => (
                                    <Typography key={i} variant="h1" fontWeight={400}
                                        fontSize={{ xs: '1.75rem', sm: '2.9rem', md: '3.9rem', lg: '4.5rem' }}
                                        component={motion.h1}
                                        initial={{ opacity: 0, }}
                                        transition={{
                                            repeat: Infinity,
                                            repeatDelay: 3,
                                            duration: 0.6,
                                            delay: i * 0.1, // delay từng ký tự
                                            ease: "easeInOut",
                                        }}
                                        animate={{ opacity: 1, y: [-50, 20, 0] }}
                                    >
                                        { char}
                                    </Typography>))}
                                {(' LenStore').split('').map((char, i) => (
                                    <Typography key={i} variant="h1" fontWeight={400}
                                         fontSize={{ xs: '1.75rem', sm: '2.9rem', md: '3.9rem', lg: '4.5rem' }}
                                        component={motion.h1}
                                        initial={{ opacity: 0, }}
                                        transition={{
                                            repeat: Infinity,
                                            repeatDelay: 3,
                                            duration: 0.6,
                                            delay: (22+i) * 0.1, // delay từng ký tự
                                            ease: "easeInOut",
                                        }}
                                        animate={{ opacity: 1, y: [-50, 20, 0] }} 
                                        sx={{
                                        background: "linear-gradient(45deg, #ff6b6b, #feca57)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        fontWeight: '700',
                                        whiteSpace: 'nowrap',
                                        lineHeight: 1,
                                    }}
                                    >
                                        {char}
                                    </Typography>))}
                            </Stack>

                            <Typography mx={1} textAlign={'center'} letterSpacing={0.5} mt={6}  width={{sm: '100%', md: '50%'}}
                                component={motion.h1} variant={'subtitle1'}
                                initial={{ opacity: 0, }} color={gray[100]}
                                transition={{ duration: 2, }}
                                animate={{ opacity: 0.8, y: [300, -20, 0] }}>
                                Thế giới của những món quà làm từ len sợi hoàn toàn thủ công.
                                Bên cạnh những mặt hàng đã có, <span style={{
                                        background: "linear-gradient(135deg, #60A5FA, #22D3EE, #A78BFA)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        fontWeight: '700',
                                        whiteSpace: 'nowrap', width: 'auto' 
                                    }}>LenStore</span> rất sẵn sàng thực hiện các mẫu sản phẩm
                                theo ý tưởng và yêu cầu của bạn!
                            </Typography>
                            <Stack direction={'row'} spacing={3} mt={8}>
                                <Box component={motion.div} initial={{ visibility: 'hidden' }} transition={{ duration: 2 }} animate={{ visibility: 'visible', x: [-300, 0] }}>

                                    <ButtonIconText
                                        iconComp={<LightBulbIcon />}
                                        title="Liên hệ đặt mẫu"
                                        buttonProps={{
                                            size: 'large', variant: 'outlined', color: 'secondary',
                                        }}
                                    />
                                </Box>
                                <Box component={motion.div} 
                                initial={{ visibility: 'hidden' }}
                                  animate={controls}
                                >
                                    <ButtonIconText
                                        iconComp={<CursorArrowRaysIcon />}
                                        title="Khám phá LenStore" onClick={() => router.push('/handmade/all')}
                                        buttonProps={{ size: 'large', color: 'secondary' }}
                                    />
                                </Box>
                            </Stack>
                        </Stack>

                    </Box>
                ))}

            </Box>


        </Box>
    );
}
