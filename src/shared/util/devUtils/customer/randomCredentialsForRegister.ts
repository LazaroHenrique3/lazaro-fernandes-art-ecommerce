import { FormHandles } from '@unform/core'
import { cpf } from 'cpf-cnpj-validator'

// Listas de partes de nomes
const firstName = ['Jorge', 'Felipe', 'Pedro', 'Estela', 'Lucas', 'Carlos', 'Lázaro', 'Luan']
const lastName = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Costa', 'Lima', 'Almeida']

export const handleFillOutForm = (formRef: React.RefObject<FormHandles> ) => {
    const randomCpf = cpf.generate()
    const randomCellphone = getRamdomCellphoneNumber()
    const randomName = getRandomUserName()

    formRef.current?.setData({
        image: '',
        name: randomName,
        email: `${randomName.replace(' ', '') + Math.floor(Math.random() * 100)}@gmail.com`,
        cell_phone: randomCellphone,
        genre: 'M',
        cpf: randomCpf,
        password: 'secret1',
        confirmPassword: 'secret1',
        date_of_birth: '1980-01-02'
    })
}

const getRamdomCellphoneNumber = () => {
    let numero = '9'

    for (let i = 1; i < 11; i++) {
        numero += Math.floor(Math.random() * 10)
    }

    return numero
}

const getRandomUserName = () => {
    // Escolher aleatoriamente um primeiro nome e lastName
    const name = firstName[Math.floor(Math.random() * firstName.length)]
    const lastNameRandom = lastName[Math.floor(Math.random() * lastName.length)]

    return `${name} ${lastNameRandom}`
}