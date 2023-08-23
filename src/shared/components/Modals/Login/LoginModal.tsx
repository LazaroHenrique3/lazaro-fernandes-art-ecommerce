import { useState } from 'react'
import {
    Box,
    Modal,
    Button,
    Typography,
    CircularProgress,
    LinearProgress
} from '@mui/material'

import {
    VForm,
    VTextField,
    useVForm
} from '../../../forms'

import { RegisterModal } from '.././Resgister/RegisterModal'
import { useNavBarContext } from '../../../contexts'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
}

//Hooks personalizados
import {
    UseLoginCustomer
} from './hooks'

export const LoginModal = () => {
    const { formRef } = useVForm('formRef')

    const { openModalLogin, handleCloseModalLogin } = useNavBarContext()

    const [isLoading, setIsLoading] = useState(false)

    //Hooks personalizados
    const { handleLogin } = UseLoginCustomer({ setIsLoading, formRef })

    return (
        <div>
            <Modal
                open={openModalLogin}
                onClose={handleCloseModalLogin}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 250 }}>

                    <VForm ref={formRef} onSubmit={handleLogin}>
                        {isLoading && (
                            <LinearProgress variant='indeterminate' />
                        )}

                        <Box display='flex' flexDirection='column' gap={3} marginY={2} width={250}>

                            <Typography variant='h4' align='center'>
                                LOGIN
                            </Typography>

                            <VTextField fullWidth type='email' label='Email' name='email' disabled={isLoading} size='small' />

                            <VTextField fullWidth type='password' label='Senha' name='password' disabled={isLoading} size='small' />

                            <Button
                                type='submit'
                                variant='contained'
                                disabled={isLoading}
                                endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}>
                                Entrar
                            </Button>
                        </Box>
                    </VForm>

                    <RegisterModal />
                </Box>
            </Modal>
        </div>
    )
}