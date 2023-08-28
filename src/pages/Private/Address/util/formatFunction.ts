export const formatCEP = (cep: string): string => {
    // Remove todos os caracteres não numéricos do CEP
    const numericCEP = cep.replace(/\D/g, '')

    // Aplica a formatação do CEP xxxxx-xxx
    const formattedCEP = numericCEP.replace(/^(\d{5})(\d{3})$/, '$1-$2')

    return formattedCEP
}