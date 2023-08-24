import { useState, useEffect } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { TechniqueService } from '../../../../shared/services/api/technique/TechniqueService'

type TSearchOptionsList = {
    id: number
    label: string
    product_count: number
}

interface IUseFetchTechniqueDataProps {
    setIsLoading: (status: boolean) => void
}

export const UseFetchTechniqueData = ({ setIsLoading }: IUseFetchTechniqueDataProps ) => {
    const [techniques, setCategories] = useState<TSearchOptionsList[]>([])

    useEffect(() => {


        const fetchData = async () => {
            setIsLoading(true)

            const result = await TechniqueService.getAll()
            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            const techniquesWithProducts = result.data.filter(technique => technique.product_count > 0)

            setCategories(techniquesWithProducts.map(technique => ({ id: technique.id, label: technique.name, product_count: technique.product_count })))
        }

        fetchData()

    }, [])

    return { techniques }
}