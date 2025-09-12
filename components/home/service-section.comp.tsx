import { gray } from "@/base/ui/themePrimitive";
import { Box, CardMedia, Stack, Typography } from "@mui/material";
const serviceImages = [
    { title: 'Chia sẻ', text: 'Công thức và kinh nghiệm đan móc', image: '/images/source-document.png' },
    { title: 'Bán hàng', text: 'Len và những thành phẩm từ len', image: '/images/feedback-review.png' },
    { title: 'Sáng tạo', text: 'Thiết kế theo ý tưởng của khách hàng', image: '/images/discussion-idea.png' },
]

export function ServiceSection() {
    return <Stack
        spacing={10} height={'15vh'}
        direction={'row'}
        justifyItems={'center'}
        justifyContent={'space-between'} >
        {serviceImages?.map(({ title, text, image }, index) => (

            <Stack
                key={index}
                spacing={2}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Box sx={{
                    p: 2,
                    borderRadius: '50%',
                    opacity: 0.9,
                    border: 2,
                    borderColor: gray[100]
                }}>
                    <CardMedia component="img"
                        image={image}
                        sx={{
                            aspectRatio: "1/ 1",
                            objectFit: "contain",
                            objectPosition: 'center',
                            width: 48,
                        }}
                    />
                </Box>

                <Stack spacing={0.5} >
                    <Typography variant="h6" >
                        {title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">{text}</Typography>
                </Stack>
            </Stack>
        ))}

    </Stack>
}