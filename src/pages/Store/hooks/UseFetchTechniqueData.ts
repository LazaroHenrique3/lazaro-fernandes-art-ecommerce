import { useState, useEffect } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { TechniqueService } from '../../../shared/services/api/technique/TechniqueService'

type TSearchOptionsList = {
    id: number
    label: string
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

            setCategories(result.data.map(technique => ({ id: technique.id, label: technique.name })))
        }

        fetchData()

    }, [])

    return { techniques }
}