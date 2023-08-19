import {
    useTheme,
    Box,
    Typography,
    Button,
    Divider
} from '@mui/material'

import { formattedPrice } from '../../../util'

import { useCartContext } from '../../../contexts'

interface ICartSummaryLine {
    label: string,
    value: number
}

const CartSummaryLine = ({ label, value }: ICartSummaryLine) => {
    const theme = useTheme()

    return (
        <Box display='flex' justifyContent='space-between'>
            <Typography variant='h6' color={theme.palette.primary.light} fontSize='19px' fontWeight={800}>
                {label}:
            </Typography>

            <Typography variant='h6' marginLeft={1} fontSize='19px' fontWeight={400}>
                {formattedPrice(value)}
            </Typography>
        </Box>
    )
}

export const CartResume = () => {
    const { productsInCart } = useCartContext()

    const subtotal = productsInCart.reduce((acc, product) => {
        return (product.price * product.quantitySelected) + acc
    }, 0)

    return (
        <Box width='240px' padding={2} position='fixed' bottom='0' display='flex' flexDirection='column' alignContent='center'>
            <CartSummaryLine label="Subtotal" value={subtotal} />
            <CartSummaryLine label="Frete" value={50} />
            <Divider variant='fullWidth'/>
            <CartSummaryLine label="Total" value={(subtotal + 50)} />

            <Box display='flex'>
                <Button fullWidth variant='contained'>
                    Finalizar compra
                </Button>
            </Box>
        </Box>
    )
}