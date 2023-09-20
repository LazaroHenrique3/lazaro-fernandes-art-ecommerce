import { AxiosResponse } from 'axios'
import { api } from '../axiosConfig'

export interface IDetailCustomer {
    id: number
    status: 'Ativo' | 'Inativo'
    image: string
    name: string
    email: string
    cell_phone: string
    genre: 'M' | 'F' | 'L' | 'N'
    date_of_birth: Date | string
    cpf: string
}

export interface IDetailCustomerUpdate {
    id: number
    status: 'Ativo' | 'Inativo'
    name: string
    email: string
    cell_phone: string
    genre: 'M' | 'F' | 'L' | 'N'
    date_of_birth: Date | string
    cpf: string
}

export interface IRedefineCustomer {
    email: string
    verification_token: string
    password: string
    confirmPassword: string
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

const getById = async (id: number): Promise<IDetailCustomer | Error> => {

    try {
        const { data } = await api.get(`/customer/${id}`)

        if (data) {
            return data
        }

        return new Error('Erro ao consultar registro.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao consultar registro.')
    }

}

const create = async (createData: FormData): Promise<number | Error> => {

    try {
        const { data } = await api.post('/customer', createData)

        if (data) {
            return data
        }

        return new Error('Erro ao criar registro.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao criar registro.')

    }
}

const insertNewImage = async(idCustomer: number, newImage: FormData): Promise<AxiosResponse<string> | Error> => {

    try{
        const result: AxiosResponse<string> = await api.post(`/customer/insertimage/${idCustomer}`, newImage)
        return result
    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao atualizar registro.')

    }

}

const updateById = async (idImage: number, updateData: IDetailCustomerUpdate): Promise<void | Error> => {

    try {
        await api.put(`/customer/${idImage}`, updateData)
    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao atualizar registro.')

    }
}

const updateCustomerImage = async(idImage: number, newImage: FormData): Promise<AxiosResponse<string> | Error> => {

    try{
        const result: AxiosResponse<string> = await api.put(`/customer/updateimage/${idImage}`, newImage)
        return result
    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao atualizar registro.')

    }

}

const deleteById = async (id: number): Promise<void | Error> => {

    try {
        await api.delete(`/customer/${id}`)
    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao deletar registro.')
    }

}

const deleteCustomerImage = async(idCustomer: number): Promise<void | Error> => {

    try{
        await api.delete(`/customer/deleteimage/${idCustomer}`)
    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao deletar registro.')

    }

}

const forgotPassword = async (email: string): Promise<AxiosResponse<string> | Error> => {

    try {
        const result: AxiosResponse<string> = await api.post('/customer/forgotpassword', {email})
        return result
    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Houve um erro inesperado.')
    }

}

const redefinePassword = async (redefineData: IRedefineCustomer): Promise<void | Error> => {

    try {
        await api.post('/customer/redefinepassword', redefineData)
    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao deletar registro.')
    }

}

export const CustomerService = {
    getById,
    create,
    insertNewImage,
    updateById,
    updateCustomerImage,
    deleteById,
    deleteCustomerImage,
    forgotPassword,
    redefinePassword
}