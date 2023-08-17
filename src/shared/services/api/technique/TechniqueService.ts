import { api } from '../axiosConfig'

export interface IListTechnique {
    id: number
    name: string
    product_count: number
}

type ITechniqueTotalCount = {
    data: IListTechnique[],
    totalCount: number
}

interface ErrorResponse {
    response: {
        data?: {
            errors?: {
                default?: string
            }
        }
    }
}

const LIMIT_OF_TECHNIQUES = 100

const getAll = async (page = 1, filter = '', id?: number): Promise<ITechniqueTotalCount | Error> => {
    let relativeUrl = ''

    if (id) {
        relativeUrl = `/technique?id=${id}&page=${page}&limit=${LIMIT_OF_TECHNIQUES}&filter=${filter}`
    } else {
        relativeUrl = `/technique?page=${page}&limit=${LIMIT_OF_TECHNIQUES}&filter=${filter}`
    }

    try {
        const { data, headers } = await api.get(relativeUrl)

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || LIMIT_OF_TECHNIQUES)
            }
        }

        return new Error('Erro ao listar registros.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao listar registros.')
    }
}

export const TechniqueService = {
    getAll,
}