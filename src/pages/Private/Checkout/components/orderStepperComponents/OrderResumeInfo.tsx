import {
    useTheme,
    Box,
    Typography,
    Button,
    Divider,
} from '@mui/material'

import { formattedPrice } from '../../../../../shared/util'
import { useCartContext } from '../../../../../shared/contexts'

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

interface IOrderResumeInfoProps {
    selectedShippingPrice: number
    selectedShippingMethod: string
    handleCompletePurchase: () => void
}

export const OrderResumeInfo: React.FC<IOrderResumeInfoProps> = ({
    selectedShippingPrice,
    selectedShippingMethod,
    handleCompletePurchase
}) => {
    const { productsInCart } = useCartContext()

    const subtotal = productsInCart.reduce((acc, product) => {
        return (product.price * product.quantitySelected) + acc
    }, 0)

    return (
        <Box width='240px' padding={2} display='flex' flexDirection='column' alignContent='center'>
            <CartSummaryLine label="Subtotal" value={subtotal} />
            <CartSummaryLine label={`Frete(${selectedShippingMethod})`} value={selectedShippingPrice} />
            <Divider variant='fullWidth' />
            <CartSummaryLine label="Total" value={subtotal + selectedShippingPrice} />

            <Box display='flex'>
                <Button
                    fullWidth
                    variant='contained'
                    onClick={() => handleCompletePurchase()}>
                    Concluir compra
                </Button>
            </Box>
        </Box>
    )
}