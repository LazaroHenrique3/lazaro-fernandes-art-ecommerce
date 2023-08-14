import {
    useTheme,
    Box,
    Typography,
    Card,
    CardMedia,
} from '@mui/material'

import image1 from '../../.././images/products/1.png'
import image2 from '../../.././images/products/2.png'
import image3 from '../../.././images/products/3.png'
import image4 from '../../.././images/products/4.png'

interface IImagesProps {
    name: string,
    url: string
}

const images: IImagesProps[] = [
    { name: 'Creep', url: image1 },
    { name: 'No surprises', url: image2 },
    { name: 'George Harrison', url: image3 },
    { name: 'Light of Hope', url: image4 }
]

const cardStyle = {
    minWidth: 200,
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.6)',
    },
}

export const LatestArts = () => {
    const theme = useTheme()

    return (
        <Box marginBottom={10} display='flex' alignItems='center' flexDirection='column' padding={5} component='section'>
            <Typography variant="h4" color={theme.palette.primary.light} fontWeight={800}>
                Trabalhos recentes
            </Typography>


            <Box marginY={3} display='flex' justifyContent='center' flexWrap='wrap' gap={5}>
                {images.map((image) => (
                    <Card key={image.name} sx={cardStyle}>
                        <CardMedia
                            sx={{ height: 300 }}
                            image={image.url}
                            title={image.name}
                        />
                    </Card>
                ))}
            </Box>
        </Box>
    )
}