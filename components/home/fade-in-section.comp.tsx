'use client'
import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useInView } from "framer-motion";

export function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const inView = useInView(ref, { amount: 0.8, once: true }); // khi section chiếm 80% viewport

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        width: '100%', 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease-out",
        scrollSnapAlign: "start",
      }}
    >
      {children}
    </Box>
  );
}
