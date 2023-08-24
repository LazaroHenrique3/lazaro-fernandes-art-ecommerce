import { useState, useEffect } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { CategoryService } from '../../../../shared/services/api/category/CategoryService'

type TSearchOptionsList = {
    id: number
    label: string
    product_count: number
}

interface IUseFetchCategoryDataProps {
    setIsLoading: (status: boolean) => void
}

export const UseFetchCategoryData = ({ setIsLoading }: IUseFetchCategoryDataProps ) => {
    const [categories, setCategories] = useState<TSearchOptionsList[]>([])

    useEffect(() => {


        const fetchData = async () => {
            setIsLoading(true)

            const result = await CategoryService.getAll()
            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            const categoriesWithProducts = result.data.filter(category => category.product_count > 0)

            setCategories(categoriesWithProducts.map(category => ({ id: category.id, label: category.name, product_count: category.product_count })))
        }

        fetchData()

    }, [])

    return { categories }
}