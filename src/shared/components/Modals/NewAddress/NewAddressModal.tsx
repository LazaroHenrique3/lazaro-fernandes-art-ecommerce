import { useState } from 'react'
import {
    useTheme,
    Box,
    Modal,
    Button,
    Typography,
    CircularProgress,
    Grid,
    LinearProgress,
    Icon
} from '@mui/material'
import { Scrollbars } from 'react-custom-scrollbars-2'

import {
    VForm,
    VTextField,
    VTextFieldCEP,
    useVForm
} from '../../../forms'

import { 
    IListAddress 
} from '../../../services/api/address/AddressService'

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
    UseNewAddress
} from './hooks'

interface INewAddressModal {
    addresses: IListAddress[]
    updateAddressesList: (newAddressesList: IListAddress[]) => void
}

export const NewAddressModal: React.FC<INewAddressModal> = ({addresses, updateAddressesList}) => {
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
    const { handleGetInfoByCep, handleSave } = UseNewAddress({ setIsLoading, setOpen, addresses, updateAddressesList, formRef })

    return (
        <>
            <Button
                variant='contained'
                onClick={handleOpen}
                startIcon={<Icon>map</Icon>}
            >
                Novo
            </Button>
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
                                Novo Endereço
                            </Typography>

                            <Grid container direction='column' padding={2} spacing={2}>
                                {isLoading && (
                                    <Grid item>
                                        <LinearProgress variant='indeterminate' />
                                    </Grid>
                                )}

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

                                            <Grid item xs={12}>
                                                <VTextFieldCEP label='CEP' disabled={isLoading} onBlur={(e) => handleGetInfoByCep(e.target.value)} />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <VTextField fullWidth label='Cidade' name='city' InputProps={{ readOnly: true }} disabled={isLoading} />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <VTextField fullWidth label='Estado' name='state' InputProps={{ readOnly: true }} disabled={isLoading} />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <VTextField fullWidth label='Número' name='number' disabled={isLoading} />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <VTextField fullWidth label='Bairro' name='neighborhood' disabled={isLoading} />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <VTextField fullWidth label='Logradouro' name='street' disabled={isLoading} />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <VTextField fullWidth multiline minRows={3} label='Complemento' name='complement' disabled={isLoading} />
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
