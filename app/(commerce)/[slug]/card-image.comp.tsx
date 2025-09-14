'use client'
import { Box, Button, CardMedia, Paper, Stack } from "@mui/material";
import { useCallback, useState } from "react";

export function CardImageProduct({images} : {images: string[]}) {
     const [selectImage, setSelectImage] = useState<string>()
      const handleSelectImage = useCallback((url: string) => {
             setSelectImage(url)
         }, [images])
    return (
         <Stack flex={1.2} spacing={1} >
      <Paper  >
        <CardMedia
          component="img"
          image={selectImage || images?.[0]}
          loading="lazy"
          sx={{ aspectRatio: "1/1", objectFit: "contain", objectPosition: 'center', borderRadius: 1, }}
        />
      </Paper>
      <Stack direction={'row'}>
        {!!(images?.length > 0) &&
          images?.map((i: any, indx: number) =>
            <Box key={indx}
              width={{ lg: '20%', md: '25%', sm: '33%', sx: '50%' }}
              component={Button}
              onClick={() => handleSelectImage(i)}>
              <CardMedia
                component="img"
                image={i}
                loading="lazy"
                sx={{ aspectRatio: "1/ 1", objectFit: "cover", objectPosition: 'center', borderRadius: 1, }}
              />
            </Box>)
        }
      </Stack>

    </Stack>
    )
}