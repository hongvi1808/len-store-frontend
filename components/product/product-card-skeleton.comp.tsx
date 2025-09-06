'use client'
import * as React from "react";
import {
  Card,
  CardContent,
  Stack,
  Skeleton,
} from "@mui/material";


export function ProductCardSkeleton({
   parentWidth
}: {parentWidth: number |null}) {
const getWidthCard = (col: number) => {
    if (!parentWidth) return 275;
    return (parentWidth - 8*col) / col
  }
  return (
    <Card
      sx={{
         width: { xs: getWidthCard(2), sm:  getWidthCard(3), md: getWidthCard(4), lg: getWidthCard(5) },
        borderRadius: 1,
        boxShadow: 1,
        mt: 0.5,
        overflow: "hidden",
        transition: "transform 120ms ease",
        "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
      }}
    >
      <Skeleton variant="rectangular" width={250} height={140} />

      <CardContent sx={{ py: 1 }}>
        <Stack spacing={0.5}>
             <Skeleton variant="text" width="80%" height={30} />

          <Stack direction="row" spacing={1} alignItems="center" justifyContent={'space-between'}>
             <Skeleton variant="text" width="40%" height={24} />
            <Stack spacing={0.5} direction={'row'}>
               <Skeleton variant="rectangular" width={24} height={24} />
               <Skeleton variant="rectangular" width={24} height={24} />

            </Stack>
          </Stack>

        </Stack>
      </CardContent>
      <Skeleton variant="rectangular" width={80} height={36} />
    </Card>
  );
}
