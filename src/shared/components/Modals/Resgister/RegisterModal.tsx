import { useState } from 'react'
import {
    useTheme,
    Box,
    Modal,
    Button,
    Typography,
    CircularProgress,
    Grid,
    LinearProgress
} from '@mui/material'
import { Scrollbars } from 'react-custom-scrollbars-2'

import {
    VDateInput,
    VForm,
    VInputFile,
    VSelect,
    VTextField,
    VTextFieldCPF,
    VTextFieldCellphone,
    useVForm
} from '../../../forms'

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
    UseRegisterCustomer
} from './hooks'

export const RegisterModal = () => {
    const theme = useTheme()

    const { formRef } = useVForm('formRef')

    const [isLoading, setIsLoading] = useState(false)

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    //Hooks personalizados
    const { handleSave } = UseRegisterCustomer({ setIsLoading, setOpen, formRef })

    return (
        <>
            <Button onClick={handleOpen}>Cadastre-se</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, maxWidth: '600px' }}>

                    <VForm ref={formRef} onSubmit={handleSave}>
                        <Box margin={1} display='flex' flexDirection='column'>

                            <Typography variant='h4' align='center'>
                                Cadastre-se
                            </Typography>

                            <Grid container direction='column' padding={2} spacing={2}>
                                {isLoading && (
                                    <Grid item>
                                        <LinearProgress variant='indeterminate' />
                                    </Grid>
                                )}

                                <Grid item>
                                    <Typography variant='h6'>Imagem</Typography>
                                </Grid>

                                <Grid key={'1'} container item direction='row' marginBottom={3} spacing={3}>
                                    <Grid item xs={12} >
                                        <VInputFile label='Principal' name='image' isExternalLoading={isLoading} />
                                    </Grid>
                                </Grid>

                                <Scrollbars
                                    style={{ height: '250px' }}
                                    renderThumbVertical={(props) => (
                                        <div
                                            {...props}
                                            style={{
                                                ...props.style,
                                                backgroundColor: theme.palette.primary.main,
                                                borderRadius: '4px',
                                                width: '6px',
                                            }}
                                        />
                                    )}
                                >
                                    <Box padding={2}>
                                        <Grid container item direction='row' spacing={2}>

                                            <Grid item xs={12} >
                                                <VTextField fullWidth label='Nome' name='name' disabled={isLoading} />
                                            </Grid>

                                            <Grid item xs={12} >
                                                <VTextField fullWidth label='Email' name='email' type='email' disabled={isLoading} />
                                            </Grid>

                                            <Grid item xs={12} >
                                                <VTextFieldCellphone disabled={isLoading} />
                                            </Grid>

                                            <Grid item xs={12} >
                                                <VSelect
                                                    fullWidth
                                                    label='Gênero'
                                                    name='genre'
                                                    options={[
                                                        { value: 'M', label: 'Masculino' },
                                                        { value: 'F', label: 'Feminino' },
                                                        { value: 'L', label: 'LGBTQIAPN+' },
                                                        { value: 'N', label: 'Prefiro não dizer' },
                                                    ]}
                                                    disabled={isLoading} />
                                            </Grid>

                                            <Grid item xs={12} >
                                                <VTextFieldCPF disabled={isLoading} />
                                            </Grid>

                                            <Grid item xs={12}  >
                                                <VTextField fullWidth label='Senha' name='password' type='password' disabled={isLoading} />
                                            </Grid>

                                            <Grid item xs={12}  >
                                                <VTextField fullWidth label='Confirmar Senha' name='confirmPassword' type='password' disabled={isLoading} />
                                            </Grid>

                                            <Grid item xs={12} >
                                                <VDateInput label='Data de nascimento' name='date_of_birth' disabled={isLoading} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Scrollbars>

                                <Grid item>
                                    <Box display='flex' gap={2}>
                                        <Button
                                            type='submit'
                                            variant='contained'
                                            disabled={isLoading}
                                            endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}>
                                            Cadastrar
                                        </Button>

                                        <Button
                                            type='submit'
                                            variant='outlined'
                                            disabled={isLoading}
                                            endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
                                            onClick={handleClose}>
                                            Cancelar
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </VForm>
                </Box>
            </Modal>
        </>
    )
}
