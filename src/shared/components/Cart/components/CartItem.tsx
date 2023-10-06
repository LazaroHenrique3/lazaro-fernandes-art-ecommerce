import { useState } from 'react'

import {
    Box,
    Paper,
    Typography,
    IconButton,
    TextField,
    Icon

} from '@mui/material'

import { formattedPrice } from '../../../util'
import { useCartContext } from '../../../contexts'

interface ICartItemProps {
    id: number,
    image: string,
    title: string,
    price: number,
    quantity: number,
    quantitySelected: number
}

export const CartItem: React.FC<ICartItemProps> = ({ id, image, title, price, quantity, quantitySelected }) => {
    const [qtdSelectedProducts, setQtdSelectedProducts] = useState(quantitySelected)

    const { updateProductQuantityFromCart, removeProductFromCart } = useCartContext()

    const handleUpdateQuantity = (newQuantity: number) => {
        // Atualize a quantidade no estado local
        setQtdSelectedProducts(newQuantity)
        // Atualize o produto no context
        updateProductQuantityFromCart(id, newQuantity)
    }

    return (
        <Box width='250px' padding='3px' marginTop={2} marginRight={1} display='flex' justifyContent='start' component={Paper}>
            <img height='100px' style={{ maxWidth: '80px' }} src={image} alt="product-image" />

            <Box width='100%' marginLeft={2} display='flex' justifyContent='space-between' alignSelf='center'>
                <Box maxWidth='130px'>
                    <Typography variant='h6' fontSize='15px' noWrap textOverflow='ellipsis'>
                        {title}
                    </Typography>

                    <Typography variant='h6' fontSize='18px' fontWeight={600}>
                        {formattedPrice(price)}
                    </Typography>

                    {quantity > 1 && (
                        <Box width='80px'>
                            <TextField
                                type='number'
                                value={qtdSelectedProducts}
                                onChange={(e) => handleUpdateQuantity(Number(e.target.value))}
                                variant="outlined"
                                size='small'
                                InputProps={{
                                    inputProps: {
                                        min: 1,
                                        max: quantity
                                    },
                                }} />
                        </Box>
                    )}
                </Box>

                <Box>
                    <IconButton color='error' aria-label="delete" onClick={() => removeProductFromCart(id)}>
                        <Icon>delete_icon</Icon>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}