import { Environment } from '../../../environment'
import { api } from '../axiosConfig'

import { IListAddress } from '.././address/AddressService'

export type TSalePaymentMethods = 'PIX' | 'BOLETO' | 'C. CREDITO' | 'C.DEBITO'
export type TSaleShippingMethods = 'PAC' | 'SEDEX'

export interface ISaleItems {
    idProduct: number
    quantity: number
    discount?: number
}

export interface IDetailSale {
    id: number
    status: 'Ag. Pagamento' | 'Em preparação' | 'Enviado' | 'Cancelada' | 'Concluída'
    order_date: Date | string
    estimated_delivery_date: Date | string
    payment_due_date: Date | string
    payment_method: TSalePaymentMethods
    shipping_method: TSaleShippingMethods
    payment_received_date?: Date | string
    delivery_date?: Date | string
    shipping_cost: number
    customer_id: number
    address_id: number
    sale_items: ISaleItems[]
}

export interface ISaleItemsList {
    product_id: number
    sale_id: number
    quantity: number
    price: number
    discount: number
    product_title: string
}

export interface ISaleList {
    id: number
    status: 'Ag. Pagamento' | 'Em preparação' | 'Enviado' | 'Cancelada' | 'Concluída'
    order_date: Date | string
    estimated_delivery_date: Date | string
    payment_due_date: Date | string
    payment_method: TSalePaymentMethods
    shipping_method: TSaleShippingMethods
    payment_received_date?: Date | string
    delivery_date?: Date | string
    shipping_cost: number
    customer_id: number
    address_id: number
    sale_items: ISaleItemsList[]
    sale_address: IListAddress
}

type ISaleTotalCount = {
    data: ISaleList[],
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

const getAll = async (page = 1, filter = '', idCustomer: number, id?: number): Promise<ISaleTotalCount | Error> => {
    let relativeUrl = ''

    if (id) {
        relativeUrl = `/sale/${idCustomer}?id=${id}&page=${page}&limit=${Environment.LINE_LIMIT}&filter=${filter}`
    } else {
        relativeUrl = `/sale/${idCustomer}?page=${page}&limit=${Environment.LINE_LIMIT}&filter=${filter}`
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

const getById = async (idCustomer: number, idSale: number): Promise<ISaleList | Error> => {

    try {
        const { data } = await api.get(`/sale/${idCustomer}/${idSale}`)

        if (data) {
            return data
        }

        return new Error('Erro ao consultar registro.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao consultar registro.')
    }

}

const create = async (
    idCustomer: number, 
    idAddress: number, 
    createData: Omit<IDetailSale, 'id' | 'status' | 'order_date' | 'payment_due_date' | 'payment_received_date' | 'delivery_date' | 'customer_id' | 'address_id'>
): Promise<number | Error> => {

    try {
        const { data } = await api.post(`/sale/${idCustomer}/${idAddress}`, createData)

        if (data) {
            return data
        }

        return new Error('Erro ao criar registro.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao criar registro.')

    }
}

export const SaleService = {
    getAll,
    getById,
    create,
}


