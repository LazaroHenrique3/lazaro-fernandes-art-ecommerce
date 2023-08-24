import { useAuthContext } from '../../../shared/contexts'
import { BasePagePrivateLayout } from '../../../shared/layouts'

export const PersonalData = () => {
    const { name } = useAuthContext()

    return (
        <BasePagePrivateLayout title={name || 'Cliente'}>
            Meus Dados
        </BasePagePrivateLayout>
    )
}