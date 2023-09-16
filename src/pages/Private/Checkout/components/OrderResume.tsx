import {
    useTheme,
    Typography,
    Box,
    Paper
} from '@mui/material'

import { Scrollbars } from 'react-custom-scrollbars-2'

import { useCartContext } from '../../../../shared/contexts'
import { OrderResumeItem } from './OrderResumeItem'
import { OrderResumeInfo } from './OrderResumeInfo'

interface IOrderResumeProps {
    selectedShippingPrice: number
    selectedShippingMethod: string
    handleCompletePurchase: () => void
}

export const OrderResume: React.FC<IOrderResumeProps> = ({
    selectedShippingPrice, 
    selectedShippingMethod, 
    handleCompletePurchase
}) => {
    const theme = useTheme()

    const { productsInCart } = useCartContext()

    return (
        <Box width='280px' display='flex' gap={1} padding={2} flexDirection='column' component={Paper}>
            <Typography variant='h6'>
                Resumo do carrinho
            </Typography>

            <Typography fontSize='16px' color={theme.palette.primary.light} fontWeight={800}>
                {productsInCart.length} ITEN(S) NO CARRINHO
            </Typography>

            <Scrollbars
                style={{ height: '200px' }}
                renderThumbVertical={(props) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: '4px',
                            width: '6px',
                        }}
                    />
                )}
            >
                {<Box>
                    {
                        productsInCart.map((product) => (
                            <OrderResumeItem
                                key={product.id}
                                image={product.image}
                                title={product.title}
                                price={product.price}
                                quantitySelected={product.quantitySelected} />
                        ))
                    }
                </Box>}
            </Scrollbars>

            <OrderResumeInfo
                selectedShippingPrice={selectedShippingPrice}
                selectedShippingMethod={selectedShippingMethod}
                handleCompletePurchase={handleCompletePurchase} />
        </Box>
    )
}