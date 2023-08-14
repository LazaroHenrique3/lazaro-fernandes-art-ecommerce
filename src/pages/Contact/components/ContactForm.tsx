import {
    useMediaQuery,
    useTheme,
    Box,
    Button,
    Grid
} from '@mui/material'

import {
    VForm,
    VTextField,
    useVForm,
} from '../../../shared/forms'

interface IContactFormProps {
    isLoading: boolean
    setLoading: (isLoading: boolean) => void
}

export const ContactForm = ({ isLoading, setLoading }: IContactFormProps) => {
    const { formRef } = useVForm('formRef')

    const theme = useTheme()

    //Retorna true ou false de acordo com o tamanho da tela
    const xsDown = useMediaQuery(theme.breakpoints.only('xs'))

    return (
        <Grid container item xs={12} sm={7} md={8} justifyContent='center'>
            <Box minWidth='300px' flexGrow={1} padding={2}>
                <VForm ref={formRef} onSubmit={() => console.log('')}>
                    <Box display='flex' flexDirection='column' alignItems={(xsDown ? 'center' : '')} padding={2} gap={2}>

                        <Box display='flex' flexDirection='column' gap={2} width='100%'>
                            <VTextField fullWidth label='Nome' name='name' disabled={isLoading} />

                            <VTextField fullWidth label='Email' name='email' type='email' disabled={isLoading} />

                            <VTextField fullWidth multiline minRows={3} label='Mensagem' name='message' disabled={isLoading} />
                        </Box>

                        <Button type='submit' variant="contained" color="primary" sx={{ width: '200px', fontSize: '16px' }}>
                            Enviar
                        </Button>
                    </Box>
                </VForm>
            </Box>
        </Grid>

    )
}