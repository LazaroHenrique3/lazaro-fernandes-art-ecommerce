import {
    Box,
    Paper,
    Typography
} from '@mui/material'

import { formattedPrice } from '../../../../../shared/util'

interface IOrderResumeItemProps {
    image: string,
    title: string,
    price: number,
    quantitySelected: number
}

export const OrderResumeItem: React.FC<IOrderResumeItemProps> = ({ image, title, price, quantitySelected }) => {

    return (
        <Box width='250px' padding='3px' marginTop={2} marginRight={1} display='flex' justifyContent='start' component={Paper}>
            <img height='100px' style={{ maxWidth: '80px' }} src={image} alt="product-image" />

            <Box width='100%' marginLeft={2} display='flex' justifyContent='space-between' alignSelf='center'>
                <Box maxWidth='130px'>
                    <Typography variant='h6' fontSize='15px' noWrap textOverflow='ellipsis'>
                        {title}
                    </Typography>

                    <Typography variant='h6' fontSize='15px' noWrap >
                        Qtde: {quantitySelected}
                    </Typography>

                    <Typography variant='h6' fontSize='18px' fontWeight={600}>
                        {formattedPrice(price)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}