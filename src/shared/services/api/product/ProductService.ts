import { Environment } from '../../../environment'
import { api } from '../axiosConfig'

export interface IImageProductList {
    id: number
    url: string
}

export interface IImageProps {
    original: string
    thumbnail: string
}

export interface IListProduct {
    id: number
    status: 'Ativo' | 'Vendido' | 'Inativo'
    type: 'Print' | 'Original'
    title: string
    orientation: 'Retrato' | 'Paisagem'
    quantity: number
    production_date: Date | string
    description?: string
    weight: number
    price: number
    main_image: string
    product_images: IImageProductList[]
    dimension_id: number
    technique_id: number
    category_id: number
    technique_name: string
    category_name: string
    dimension_name: string
}

type IProductTotalCount = {
    data: IListProduct[],
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

const getAll = async (page = 1, category = '', technique = '', order = '', type = '', filter = '', status = '', id?: number): Promise<IProductTotalCount | Error> => {
    let relativeUrl = ''

    if (id) {
        relativeUrl = `/product?id=${id}&page=${page}&limit=${Environment.LINE_LIMIT}&filter=${filter}&category=${category}&technique=${technique}&type=${type}&order=${order}&status=${status}`
    } else {
        relativeUrl = `/product?page=${page}&limit=${Environment.LINE_LIMIT}&filter=${filter}&category=${category}&technique=${technique}&type=${type}&order=${order}&status=${status}`
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

const getById = async (id: number): Promise<IListProduct | Error> => {

    try {
        const { data } = await api.get(`/product/${id}`)

        if (data) {
            return data
        }

        return new Error('Erro ao consultar registro.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao consultar registro.')
    }

}

export const ProductService = {
    getAll,
    getById,
}