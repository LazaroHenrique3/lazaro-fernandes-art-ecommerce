import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
    Grid,
    Typography,
    Button,
    Icon,
    TextField,
    Box
} from '@mui/material'

import { 
    formattedDateBR, 
    formattedPrice 
} from '../../../../shared/util'

import { useCartContext } from '../../../../shared/contexts'
import { IListProduct } from '../../../../shared/services/api/product/ProductService'
import { InfoItem, InfoSection } from './InfoComponents'

interface IProductDetailsInfo {
    product: Omit<IListProduct, 'product_images'>
}

export const ProductDetailsInfo: React.FC<IProductDetailsInfo> = ({ product }) => {
    const navigate = useNavigate()

    const [qtdSelectedProducts, setQtdSelectedProducts] = useState(1)

    const { addProductInCart } = useCartContext()

    return (
        <Grid container item sm={12} md={7}>
            <Box width='100%' display='flex' alignSelf='center' flexDirection='column' rowGap={2} alignItems='start'>
                <InfoSection title="Detalhes">
                    <InfoItem label="Técnica" value={product.technique_name} />
                    <InfoItem label="Categoria" value={product.category_name} />
                    <InfoItem label="Dimensões(cm)" value={product.dimension_name} />
                    <InfoItem label="Tipo" value={product.type} />
                    <InfoItem label="Produção" value={formattedDateBR(product.production_date)}/>
                    <InfoItem label="Quantidade" value={String(product.quantity)}/>
                </InfoSection>

                {product.description && (
                    <InfoSection title="Descrição">
                        <Typography variant='h6' textAlign='justify' fontSize={18}>
                            {product.description}
                        </Typography>
                    </InfoSection>
                )}

                <InfoSection title="Valor">
                    <Typography variant='h4' fontWeight={500}>
                        {formattedPrice(product.price)}
                    </Typography>
                </InfoSection>

                {(product.status !== 'Vendido') &&
                    <Box width='80px'>
                        <TextField
                            type='number'
                            value={qtdSelectedProducts}
                            onChange={(e) => setQtdSelectedProducts(Number(e.target.value))}
                            variant="outlined"
                            size='small'
                            InputProps={{
                                inputProps: {
                                    min: 1,
                                    max: product.quantity
                                },
                            }} />
                    </Box>
                }

                <Box display='flex' gap={2}>
                    {(product.status !== 'Vendido') &&
                        <Button
                            variant='contained'
                            endIcon={<Icon>add_shopping_cart_icon</Icon>}
                            onClick={() => addProductInCart({
                                id: product.id,
                                title: product.title,
                                image: product.main_image,
                                price: product.price,
                                weight: product.weight,
                                dimension: product.dimension_name,
                                quantity: product.quantity,
                                quantitySelected: qtdSelectedProducts
                            })}>
                            Adicionar ao carrinho
                        </Button>
                    }

                    <Button
                        variant='outlined'
                        endIcon={<Icon>arrow_back_icon</Icon>}
                        onClick={() => navigate(-1)}
                    >
                        Voltar
                    </Button>
                </Box>
            </Box>
        </Grid >
    )
}