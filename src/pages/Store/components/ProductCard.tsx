import { useNavigate } from 'react-router-dom'

import {
    useTheme,
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Button,
    Icon
} from '@mui/material'

import { formattedPrice } from '../../../shared/util'
import { useCartContext } from '../../../shared/contexts'

const cardStyle = {
    width: 260,
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.6)',
    },
}

interface IProductCardProps {
    id: number
    title: string
    status: string
    image: string
    price: number
    weight: number
    dimension: string
    quantity: number
}

export const ProductCard: React.FC<IProductCardProps> = ({ id, title, status, image, price, weight, dimension, quantity }) => {
    const theme = useTheme()

    const { addProductInCart } = useCartContext()

    const navigate = useNavigate()

    return (
        <Grid container item xs={12} sm={6} lg={4} justifyContent='center'>
            <Box>
                <Card sx={cardStyle } onClick={() => navigate(`/product/details/${id}`)}>
                    <CardMedia
                        sx={{ height: 380, width: 260 }}
                        image={image}
                        title={title}
                    />

                    <CardContent>
                        <Typography gutterBottom fontWeight={600} textTransform='uppercase' textAlign='center' variant="h6" component="div" noWrap textOverflow='ellipsis'>
                            {title}
                        </Typography>

                        <Typography gutterBottom fontWeight={600} textTransform='uppercase' textAlign='center' variant="h6" color={theme.palette.primary.light} component="div">
                            {status !== 'Vendido' ? formattedPrice(price) : status}
                        </Typography>
                    </CardContent>

                    <CardActions sx={{ marginTop: '-25px', display: 'flex', justifyContent: 'center' }}>
                        <Button startIcon={<Icon>remove_red_eye_icon</Icon>} variant='outlined' size="small" onClick={() => navigate(`/product/details/${id}`)}>
                            Detalhes
                        </Button>

                        {status !== 'Vendido' && (
                            <Button variant='contained' size="small" onClick={(event) => {
                                event.stopPropagation()
                                addProductInCart({id, title, image, price, weight, dimension, quantity, quantitySelected: 1})
                            }}>
                                <Icon>
                                    add_shopping_cart_icon
                                </Icon>
                            </Button>
                        )}
                    </CardActions>
                </Card>
            </Box>

        </Grid>
    )
}