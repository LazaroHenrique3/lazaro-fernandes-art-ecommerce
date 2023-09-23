import dayjs from 'dayjs'

export const formatCEP = (cep: string): string => {
    // Remove todos os caracteres não numéricos do CEP
    const numericCEP = cep.replace(/\D/g, '')

    // Aplica a formatação do CEP xxxxx-xxx
    const formattedCEP = numericCEP.replace(/^(\d{5})(\d{3})$/, '$1-$2')

    return formattedCEP
}

export const formattedPrice = (value: number | string) => {

    if (typeof value === 'string') return ''

    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

export const formattedDateBR = (date: string | Date): string => {
    return dayjs(date).format('DD/MM/YYYY')
}