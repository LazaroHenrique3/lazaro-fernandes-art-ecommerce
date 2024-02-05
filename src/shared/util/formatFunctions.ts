import dayjs from 'dayjs'
import { format, parseISO } from 'date-fns'

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

export function formatDateTimeForTrackOrder(dateTimeString: string) {
    const dateTime = parseISO(dateTimeString)

    // Verifica se a conversão foi bem-sucedida
    if (isNaN(dateTime.getTime())) {
        console.error('Invalid date and time format')
        return 'Data inválida'
    }

    // Formatar a data e hora conforme desejado (DD/MM/YYYY às HH:mm)
    const formattedDateTime = format(dateTime, 'dd/MM/yyyy \'às\' HH:mm')


    return formattedDateTime
}

export const formattedDateBR = (date: string | Date): string => {
    return dayjs(date).format('DD/MM/YYYY')
}

export const formattedDateUS = (date: Date): string => {
    if (date === null) return ''
    return format(date, 'yyyy-MM-dd')
}

export function showFormattedDataString(date: string, typeFormatation: 'pt' | 'en' = 'pt'): string {

    const parts = date.split('-')
    if (parts.length !== 3) {
        return 'Data inválida'
    }

    const [year, month, day] = parts

    return (typeFormatation === 'pt') ? `${day}/${month}/${year}` : `${year}-${month}-${day}`
}
