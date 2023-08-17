import dayjs from 'dayjs'
import {
    useTheme,
    Grid,
    Typography,
    Button,
    Icon,
    Box
} from '@mui/material'

import { formattedPrice } from '../../../shared/util'

interface IProductDetailsInfo {
    technique: string,
    category: string,
    dimension: string,
    production: Date | string,
    price: number,
    description?: string
}

export const ProductDetailsInfo: React.FC<IProductDetailsInfo> = ({
    technique,
    category,
    dimension,
    production,
    price,
    description
}) => {
    const theme = useTheme()

    return (
        <Grid container item sm={12} md={7}>
            <Box width='100%' display='flex'  flexDirection='column' rowGap={2} alignItems='start'>
                <Box>
                    <Typography variant='h5' color={theme.palette.primary.light} fontWeight={600}>
                        Detalhes
                    </Typography>

                    <Typography variant='h6' fontSize={18}>
                        <strong>Técnica: </strong> {technique}
                    </Typography>

                    <Typography variant='h6' fontSize={18}>
                        <strong>Categoria: </strong> {category}
                    </Typography>

                    <Typography variant='h6' fontSize={18}>
                        <strong>Dimensões(cm): </strong> {dimension}
                    </Typography>

                    <Typography variant='h6' fontSize={18}>
                        <strong>Produção: </strong> {dayjs(production).format('DD/MM/YYYY')}
                    </Typography>
                </Box>

                {description && (
                    <Box>
                        <Typography variant='h5' color={theme.palette.primary.light} fontWeight={600}>
                            Descrição
                        </Typography>

                        <Typography variant='h6' textAlign='justify' fontSize={18}>
                            {description}
                        </Typography>
                    </Box>
                )}

                <Box>
                    <Typography variant='h5' color={theme.palette.primary.light} fontWeight={600}>
                        Valor
                    </Typography>

                    <Typography variant='h4' fontWeight={500}>
                        {formattedPrice(price)}
                    </Typography>
                </Box>

                <Box display='flex' gap={2}>
                    <Button variant='contained'>
                        Comprar
                    </Button>

                    <Button variant='outlined'>
                        <Icon>
                            add_shopping_cart_icon
                        </Icon>
                    </Button>
                </Box>
            </Box>
        </Grid>

    )
}