import { useState } from 'react'
import { useParams } from 'react-router-dom'

import {
    useTheme,
    Grid,
    Typography,
    Box,
    Skeleton
} from '@mui/material'

import { BasePageEcommerceLayout } from '../../../shared/layouts'
import { ProductDetailsInfo, ProductImages } from './components'

import {
    IListProduct,
    IImageProps
} from '../../../shared/services/api/product/ProductService'

const container = {
    maxWidth: 1200,
    margin: '0 auto',
}

//Hooks personalizados
import {
    UseFetchProductData
} from './hooks'

export const ProductDetails = () => {
    const { id = '0' } = useParams<'id'>()

    const theme = useTheme()

    const [isLoading, setIsLoading] = useState(false)

    const [product, setProduct] = useState<Omit<IListProduct, 'product_images'>>()
    const [productImages, setProductImages] = useState<IImageProps[]>()

    UseFetchProductData({ setIsLoading, setProduct, setProductImages, id })

    return (
        <BasePageEcommerceLayout>

            <Box display='flex' padding={3} flexDirection='column' alignItems='center' sx={container} component='section'>

                <Typography variant='h2' marginTop={5} marginBottom={10} color={theme.palette.primary.light} fontWeight={800}>
                    {product?.title}
                </Typography>

                <Grid container marginBottom={10} spacing={4} alignItems='stretch'>
                    {(isLoading || product === undefined) ? (
                        <>
                            <Grid container item sm={12} md={5}>
                                <Skeleton variant="rectangular" width={700} height={400} />
                            </Grid>

                            <Grid container item sm={12} md={7}>
                                <Skeleton variant="rectangular" width='100%' height={400} />
                            </Grid>
                        </>
                    ) : (
                        <>
                            <ProductImages images={productImages as IImageProps[]} />
                            <ProductDetailsInfo product={product}/>
                        </>
                    )}
                </Grid>
            </Box>
        </BasePageEcommerceLayout>
    )
}