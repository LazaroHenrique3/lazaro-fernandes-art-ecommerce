import { Environment } from '../../../environment'
import { api } from '../axiosConfig'

export interface IListTechnique {
    id: number
    name: string
}

export interface IDetailTechnique {
    id: number
    name: string
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

const getAll = async (page = 1, filter = '', id?: number): Promise<ITechniqueTotalCount | Error> => {
    let relativeUrl = ''

    if (id) {
        relativeUrl = `/technique?id=${id}&page=${page}&limit=${Environment.LINE_LIMIT}&filter=${filter}`
    } else {
        relativeUrl = `/technique?page=${page}&limit=${Environment.LINE_LIMIT}&filter=${filter}`
    }

    try {
        const { data, headers } = await api.get(relativeUrl)

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LINE_LIMIT)
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