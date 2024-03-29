import { Environment } from '../../../environment'
import { api } from '../axiosConfig'

import { IListAddress } from '.././address/AddressService'
import { IPriceDeadlineResponse } from '../shipping/ShippingService'

export type TSalePaymentMethods = 'PIX' | 'BOLETO' | 'C. CREDITO' | 'C.DEBITO'
export type TSaleShippingMethods = 'PAC' | 'SEDEX'
export type TSaleStatus = 'Ag. Pagamento' | 'Em preparação' | 'Enviado' | 'Cancelada' | 'Concluída'

export interface ISaleItems {
    idProduct: number
    quantity: number
    discount?: number
}

export interface IDetailSale {
    id: number
    status: TSaleStatus
    order_date: Date | string
    estimated_delivery_date: Date | string
    payment_due_date: Date | string
    payment_method: TSalePaymentMethods
    shipping_method: TSaleShippingMethods
    payment_received_date?: Date | string
    delivery_date?: Date | string
    shipping_cost: number
    tracking_code?: string
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

export interface ISaleListById {
    id: number
    status: TSaleStatus
    order_date: Date | string
    estimated_delivery_date: Date | string
    payment_due_date: Date | string
    payment_method: TSalePaymentMethods
    shipping_method: TSaleShippingMethods
    payment_received_date?: Date | string
    delivery_date?: Date | string
    shipping_cost: number
    tracking_code?: string
    customer_id: number
    address_id: number
    sale_items: ISaleItemsList[]
    sale_address: IListAddress
    customer_name: string,
    total: number
}

export interface ISaleListAll {
    id: number
    status: 'Ag. Pagamento' | 'Em preparação' | 'Enviado' | 'Cancelada' | 'Concluída'
    order_date: Date | string
    estimated_delivery_date: Date | string
    payment_due_date: Date | string
    payment_method: 'PIX' | 'BOLETO' | 'C. CREDITO' | 'C. DEBITO'
    shipping_method: 'PAC' | 'SEDEX'
    payment_received_date?: Date | string
    delivery_date?: Date | string
    shipping_cost: number
    tracking_code?: string
    customer_id: number
    address_id: number
    customer_name: string
    total: number
}

export interface IUpdatedSaleAddress {
    updatedAddress: IListAddress,
    estimated_delivery_date: string,
    shipping_method: 'PAC' | 'SEDEX',
    shipping_cost: number
    subtotal: number
}

type ISaleTotalCount = {
    data: ISaleListAll[],
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

const getAll = async (page = 1, filter = '', status = '', orderDate = '', paymentDueDate = '', orderByPrice = '', idCustomer: number, id?: number): Promise<ISaleTotalCount | Error> => {
    let relativeUrl = ''

    if (id) {
        relativeUrl = `/sale/${idCustomer}?id=${id}&page=${page}&limit=${Environment.LINE_LIMIT}&filter=${filter}&status=${status}&orderDate=${orderDate}&paymentDueDate=${paymentDueDate}&orderByPrice=${orderByPrice}`
    } else {
        relativeUrl = `/sale/${idCustomer}?page=${page}&limit=${Environment.LINE_LIMIT}&filter=${filter}&status=${status}&orderDate=${orderDate}&paymentDueDate=${paymentDueDate}&orderByPrice=${orderByPrice}`
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

const getById = async (idCustomer: number, idSale: number): Promise<ISaleListById | Error> => {

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

const cancelSale = async (idCustomer: number, idSale: number): Promise<void | Error> => {

    try {
        await api.put(`/sale/cancel/${idCustomer}/${idSale}`)
    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao cancelar pedido.')

    }

}

const paySale = async (idCustomer: number, idSale: number): Promise<void | Error> => {

    try {
        await api.put(`/sale/pay/${idCustomer}/${idSale}`)
    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao pagar pedido.')

    }

}

const concludeSale = async (idCustomer: number, idSale: number): Promise<void | Error> => {

    try {
        await api.put(`/sale/concluded/${idCustomer}/${idSale}`)
    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao concluir pedido.')

    }

}

const updateSaleAddress = async (idCustomer: number, idSale: number, idNewAddress: number, shippingMethod: TSaleShippingMethods): Promise<IUpdatedSaleAddress | Error> => {

    try {
        const { data } = await api.put(`/sale/update/sale-address/${idCustomer}/${idSale}/${idNewAddress}/${shippingMethod}`)

        if (data) {
            return data
        }

        return new Error('Erro ao receber retorno.')
    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao atualizar endereço de entrega.')
    }

}

const recalculateShipping = async (idCustomer: number, idSale: number, cep: string): Promise<IPriceDeadlineResponse | Error> => {

    try {
        const { data } = await api.post(`/sale/recalculate-shipping/${idCustomer}/${idSale}/${cep}`)

        if (data) {
            return data
        }

        return new Error('Erro ao calcular frete.')
    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao calcular frete.')
    }

} 

export const SaleService = {
    getAll,
    getById,
    create,
    cancelSale,
    paySale,
    concludeSale,
    updateSaleAddress,
    recalculateShipping
}


