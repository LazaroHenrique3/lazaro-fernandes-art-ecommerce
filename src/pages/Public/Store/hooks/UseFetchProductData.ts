import { useEffect } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDebounce } from '../../../../shared/hooks'

import { ProductService, IListProduct } from '../../../../shared/services/api/product/ProductService'

interface IUseFetchProductDataProps {
    setIsLoading: (status: boolean) => void
    setProducts: (products: IListProduct[]) => void
    setTotalCount: (total: number) => void
    search: string
    category: string
    technique: string
    order: string
    page: number
}

export const UseFetchProductData = ({setIsLoading, setProducts, setTotalCount, search, category, technique, order, page}: IUseFetchProductDataProps) => {
    //Para adicionar delay na pesquisa
    const { debounce } = useDebounce()

    useEffect(() => {
        setIsLoading(true)
    
        const fetchData = () => {
            debounce(async () => {
                const result = await ProductService.getAll(page, category, technique, order, search)
                setIsLoading(false)
    
                if (result instanceof Error) {
                    toast.error(result.message)
                    return
                }
    
                setProducts(result.data)
                setTotalCount(result.totalCount)
            })
        }
    
        fetchData()
    
    }, [search, category, technique, order, page])
}

