import { useNavigate } from 'react-router-dom'
import {
    useTheme,
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent
} from '@mui/material'

import image1 from '../../../.././images/originalArts/1.svg'
import image2 from '../../../.././images/originalArts/2.svg'
import image3 from '../../../.././images/originalArts/3.svg'

interface IImagesProps {
    name: string,
    url: string
}

const images: IImagesProps[] = [
    { name: 'Tina Turner', url: image1 },
    { name: 'Light of Hope', url: image2 },
    { name: 'Cordeiro e o Leão', url: image3 },
]

const cardStyle = {
    width: 300,
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.6)',
    },
}

export const OriginalArts = () => {
    const theme = useTheme()
    const navigate = useNavigate()

    return (
        <Box marginBottom={10} justifyContent='center' display='flex' gap={4} flexWrap='wrap' component='section'>

            <Box display='flex' flexDirection='column' alignItems='center' gap={3} sx={{ width: '300px' }}>
                <Typography variant="h3" align='center' color={theme.palette.primary.light} fontWeight={800}>
                    Artes Originais
                </Typography>

                <Typography align='justify' variant="h6" fontWeight={500}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quae ad est quasi alias exercitationem atque doloremque illo.
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: '200px', fontSize: '16px' }}
                    onClick={() => navigate('/store')}
                >
                    Ver coleção
                </Button>
            </Box>

            {images.map((image) => (
                <Box key={image.name}>
                    <Card sx={cardStyle}>
                        <CardMedia
                            sx={{ height: 300 }}
                            image={image.url}
                            title={image.name}
                        />

                        <CardContent>
                            <Typography gutterBottom textTransform='uppercase' textAlign='center' variant="h5" component="div">
                                {image.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Box>
    )
}