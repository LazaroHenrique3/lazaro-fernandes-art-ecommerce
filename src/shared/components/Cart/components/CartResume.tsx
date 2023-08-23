import {
    useState,
    useEffect
} from 'react'

import { useNavigate } from 'react-router-dom'

import {
    useTheme,
    Box,
    Typography,
    Button,
    Divider,
    Icon,
    CircularProgress
} from '@mui/material'

import { formattedPrice } from '../../../util'
import {
    useCartContext,
} from '../../../contexts'
import { VTextFieldCEP, VForm, useVForm } from '../../../forms'

//hooks personalizados
import {
    UseCalculateShipping
} from '../hooks'

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
    const navigate = useNavigate()

    const { productsInCart } = useCartContext()

    const { formRef } = useVForm('formRef')

    const [isLoading, setIsLoading] = useState(false)
    const { shipping, calculateShipping, resetShipping } = UseCalculateShipping({ setIsLoading, formRef })

    useEffect(() => {
        resetShipping()
    }, [productsInCart])

    const subtotal = productsInCart.reduce((acc, product) => {
        return (product.price * product.quantitySelected) + acc
    }, 0)

    return (
        <Box width='240px' padding={2} position='fixed' bottom='0' display='flex' flexDirection='column' alignContent='center'>
            <VForm ref={formRef} onSubmit={calculateShipping}>
                <Box width='100%' display='flex'>
                    <Box display='flex' width='100%'>
                        <VTextFieldCEP label='Calcular Frete' size='small' />

                        <Box>
                            <Button type='submit' variant='contained' disabled={isLoading}>
                                {isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : <Icon> search </Icon>}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </VForm>

            {Number(shipping.Valor.replace(',', '.')) > 0 && (
                <Box>
                    Aproximadamente {shipping.PrazoEntrega} dias.
                </Box>
            )}

            <CartSummaryLine label="Subtotal" value={subtotal} />
            <CartSummaryLine label="Frete(PAC)" value={Number(shipping.Valor.replace(',', '.'))} />
            <Divider variant='fullWidth' />
            <CartSummaryLine label="Total" value={(subtotal + Number(shipping.Valor.replace(',', '.')))} />

            <Box display='flex'>
                <Button
                    fullWidth
                    disabled={(isLoading || Number(shipping.Valor.replace(',', '.')) <= 0)}
                    onClick={() => navigate('/customer/sale')}
                    variant='contained'>
                    Finalizar compra
                </Button>
            </Box>
        </Box>
    )
}