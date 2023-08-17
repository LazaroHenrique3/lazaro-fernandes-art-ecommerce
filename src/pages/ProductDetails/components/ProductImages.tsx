import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

import {
    Grid,
} from '@mui/material'

import { IImageProps } from '../../../shared/services/api/product/ProductService'

interface IProductImagesProps  {
    images: IImageProps[]
}

export const ProductImages: React.FC<IProductImagesProps> = ({ images }) => {

    return (
        <Grid container item sm={12} md={5}>
            <ImageGallery  items={images} />
        </Grid>
    )
}