import { Box, CircularProgress } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts'
import { BasePageEcommerceLayout } from '../../layouts'

interface ILoginProps {
    children: React.ReactNode
}

export const PrivateCustomer: React.FC<ILoginProps> = ({ children }) => {
    const { isAuthenticated, isLoading, typeUser } = useAuthContext()

    const navigate = useNavigate()

    //Se ainda estiver na etapa de loading la na autenticação
    if (isLoading) {
        return (
            <Box width='100%' height='100vh' display='flex' alignItems='center' justifyContent='center'>...
                <CircularProgress variant='indeterminate' color='inherit' size={40} />
            </Box>
        )
    }

    if (isAuthenticated && typeUser === 'customer') return (
        <BasePageEcommerceLayout>{children}</BasePageEcommerceLayout>
    )

    navigate('/home')
    return null
}