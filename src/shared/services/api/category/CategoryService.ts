import { api } from '../axiosConfig'

export interface IListCategory {
    id: number
    name: string
    product_count: number
}

type ICategoryTotalCount = {
    data: IListCategory[],
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

const LIMIT_OF_CATEGORIES = 25

const getAll = async (page = 1, filter = '', id?: number): Promise<ICategoryTotalCount | Error> => {
    let relativeUrl = ''

    if (id) {
        relativeUrl = `/category?id=${id}&page=${page}&limit=${LIMIT_OF_CATEGORIES}&filter=${filter}`
    } else {
        relativeUrl = `/category?page=${page}&limit=${LIMIT_OF_CATEGORIES}&filter=${filter}`
    }

    try {
        const { data, headers } = await api.get(relativeUrl)

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || LIMIT_OF_CATEGORIES)
            }
        }

        return new Error('Erro ao listar registros.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao listar registros.')
    }
}

export const CategoryService = {
    getAll,
}