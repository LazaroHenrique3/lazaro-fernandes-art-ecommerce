import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
    IListProduct,
    ProductService
} from '../../../../shared/services/api/product/ProductService'

import { IImageProps } from '../../../../shared/services/api/product/ProductService'

interface IUseFetchProductDataProps {
    setIsLoading: (status: boolean) => void
    setProduct: (product: Omit<IListProduct, 'product_images'>) => void
    setProductImages: (images: IImageProps[]) => void
    id: string
}

export const UseFetchProductData = ({
    setIsLoading,
    setProduct,
    setProductImages,
    id
}: IUseFetchProductDataProps) => {
    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {

            setIsLoading(true)
            const result = await ProductService.getById(Number(id))

            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
                navigate('/store')
                return
            }

            const { product_images, ...resultData } = result

            setProduct(resultData)

            const imageFormatted: IImageProps[] = product_images.map((image) => {
                return { original: image.url, thumbnail: image.url }
            })

            setProductImages(imageFormatted)
        }

        fetchData()

    }, [id])
}