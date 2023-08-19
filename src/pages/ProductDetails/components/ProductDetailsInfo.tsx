import dayjs from 'dayjs'
import {
    Grid,
    Typography,
    Button,
    Icon,
    Box
} from '@mui/material'

import { formattedPrice } from '../../../shared/util'

import { useCartContext } from '../../../shared/contexts'
import { IListProduct } from '../../../shared/services/api/product/ProductService'
import { InfoItem, InfoSection } from './InfoComponents'

interface IProductDetailsInfo {
    product: Omit<IListProduct, 'product_images'>
}

export const ProductDetailsInfo: React.FC<IProductDetailsInfo> = ({ product }) => {
    const { addProductInCart } = useCartContext()

    return (
        <Grid container item sm={12} md={7}>
            <Box width='100%' display='flex' alignSelf='center' flexDirection='column' rowGap={2} alignItems='start'>
                <InfoSection title="Detalhes">
                    <InfoItem label="Técnica" value={product.technique_name} />
                    <InfoItem label="Categoria" value={product.category_name} />
                    <InfoItem label="Dimensões(cm)" value={product.dimension_name} />
                    <InfoItem label="Produção" value={dayjs(product.production_date).format('DD/MM/YYYY')} />
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

                <Box display='flex' gap={2}>
                    <Button
                        variant='contained'
                        endIcon={<Icon>add_shopping_cart_icon</Icon>}
                        onClick={() => addProductInCart({
                            id: product.id,
                            title: product.title,
                            image: product.main_image,
                            price: product.price,
                            quantity: product.quantity,
                            quantitySelected: 1
                        })}>
                        Adicionar ao carrinho
                    </Button>
                </Box>
            </Box>
        </Grid>
    )
}