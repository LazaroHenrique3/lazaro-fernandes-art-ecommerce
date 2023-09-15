import { api } from '../axiosConfig'

export interface IPrecoPrazoResponse {
	Codigo: string;
	Valor: string;
	PrazoEntrega: string;
	ValorSemAdicionais: string;
	ValorMaoPropria: string;
	ValorAvisoRecebimento: string;
	ValorDeclarado: string;
	EntregaDomiciliar: string;
	EntregaSabado: string;
	obsFim: string;
	Erro: string;
	MsgErro: string;
}

export interface ICalculateShipping {
   cep: string
   weight: number,
   width: number,
   length: number,
   height: number
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

const calculateShipping = async (consultData: ICalculateShipping): Promise<IPrecoPrazoResponse[] | Error> => {
    try {
        const { data } = await api.post('/shipping/calculateshipping', consultData)

        if (data) {
            return data
        }

        return new Error('Erro ao calcular frete.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao calcular frete.')
    }
}

export const ShippingService = {
    calculateShipping,
}
