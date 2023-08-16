import { useState, useEffect } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { CategoryService } from '../../../shared/services/api/category/CategoryService'

type TSearchOptionsList = {
    id: number
    label: string
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

            setCategories(result.data.map(category => ({ id: category.id, label: category.name })))
        }

        fetchData()

    }, [])

    return { categories }
}