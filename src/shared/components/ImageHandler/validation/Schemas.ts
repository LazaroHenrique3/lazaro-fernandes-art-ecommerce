import * as yup from 'yup'
import { existsImage, isValidSize, isValidType } from '../../../util/validationUtils/product'

interface IFormDataUpdateImage {
    image: FileList
}

//Definindo o schema para validar as imagens na hora de editar
export const formatValidationSchemaUpdateImage: yup.Schema<IFormDataUpdateImage> = yup.object().shape({
    image: yup.mixed()
        .test('isImage', (value) => {  
            const mainImage: FileList = value as FileList

            // Obtendo a primeira imagem do FileList
            const image = mainImage[0]

            //Verificando se foi passado imagem
            existsImage(mainImage.length, value)

            //Verificando o formato das imagens
            isValidType(image.type, value)

            // Verifica se o tamanho da imagem é maior que 2MB (em bytes)
            isValidSize(image.size, value)

            return true
        })
        .required() as yup.Schema<FileList>,
})