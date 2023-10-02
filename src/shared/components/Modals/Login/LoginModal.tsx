import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Modal,
    Button,
    Typography,
    CircularProgress,
    LinearProgress,
    Link
} from '@mui/material'

import {
    VForm,
    VTextField,
    VTextFieldPassword,
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
    const navigate = useNavigate()

    const { formRef } = useVForm('formRef')

    const { openModalLogin, handleCloseModalLogin } = useNavBarContext()

    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

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

                            <VTextField 
                                fullWidth 
                                type='email' 
                                label='Email' 
                                name='email' 
                                disabled={isLoading} 
                                size='small' />

                            <VTextFieldPassword
                                fullWidth
                                name='password'
                                label='Senha'
                                disabled={isLoading}
                                showPassword={showPassword}
                                handleClickShowPassword={setShowPassword}
                                size='small' />

                            <Button
                                type='submit'
                                variant='contained'
                                disabled={isLoading}
                                endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}>
                                Entrar
                            </Button>
                        </Box>
                    </VForm>


                    <Box width='100%' display='flex' justifyContent='center' mb={1}>
                        <Link variant="body2" onClick={() => navigate('/customer/forgot-password')}>
                            Esqueci minha senha
                        </Link>
                    </Box>

                    <RegisterModal />
                </Box>
            </Modal>
        </div>
    )
}