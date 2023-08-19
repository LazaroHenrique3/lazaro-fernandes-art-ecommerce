import {
    useTheme,
    Box,
    Paper,
    Typography,
} from '@mui/material'

import { Scrollbars } from 'react-custom-scrollbars-2'

import { CartItem, CartResume } from './components'

import { useCartContext } from '../../contexts'

const cartContainer = {
    height: '100vh',
    width: '100%',
    maxWidth: '280px',
    zIndex: 0,
    position: 'fixed',
    top: 0,
    right: 0,
    paddingTop: '100px',
    paddingX: 2,
}

export const Cart = () => {
    const theme = useTheme()

    const { productsInCart, cartIsOpen } = useCartContext()

    return (
        <>
            {cartIsOpen && (
                <Box sx={cartContainer} component={Paper}>
                    <Typography variant='h6' color={theme.palette.primary.light} fontWeight={800}>
                        Seu carrinho
                    </Typography>

                    {(productsInCart.length === 0) ? (
                        <Typography variant='h6' fontSize='15px'>
                            Seu carrinho está vazio...
                        </Typography>
                    ) : (
                        <>
                            <Scrollbars
                                style={{ height: '50%' }}
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
                                            <CartItem
                                                key={product.id}
                                                id={product.id}
                                                image={product.image}
                                                title={product.title}
                                                quantity={product.quantity}
                                                price={product.price}
                                                quantitySelected={product.quantitySelected} />
                                        ))
                                    }
                                </Box>}
                            </Scrollbars>

                            <CartResume />
                        </>
                    )}
                </Box>
            )}
        </>
    )
}