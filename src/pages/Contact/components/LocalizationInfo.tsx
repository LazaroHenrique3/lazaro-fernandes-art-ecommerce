import {
    useTheme, 
    useMediaQuery,
    Box,
    Typography,
    Link,
    Grid
} from '@mui/material'

import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

export const LocalizationInfo = () => {
    const theme = useTheme()

    //Retorna true ou false de acordo com o tamanho da tela
    const xsDown = useMediaQuery(theme.breakpoints.only('xs'))

    return (
        <Grid container item xs={12} sm={5} md={4} justifyContent='center' alignSelf='center'>
            <Box display='flex' flexDirection='column' alignItems={(xsDown ? 'center' : '')} maxWidth='300px'>
                <Typography variant='h4' marginBottom={5}>
                    Localização
                </Typography>

                <Typography variant='h5' marginBottom={5}>
                    Rua dos Banzero,
                    nº 71 - Bairro Tchurusbango.
                    <br />
                    CEP: 40000-000.
                </Typography>

                <Box display='flex' gap={2}>
                    <Link href='https://www.instagram.com/lazaro_fernandes_art/' target='_blank' underline="none">
                        <InstagramIcon />
                    </Link>
                    <Link href='https://www.instagram.com/lazaro_fernandes_art/' target='_blank' underline="none">
                        <FacebookIcon />
                    </Link>
                    <Link href='https://www.instagram.com/lazaro_fernandes_art/' target='_blank' underline="none">
                        <WhatsAppIcon />
                    </Link>
                </Box>

                <Typography variant='h6'>
                    ©2023, Lázaro Fernandes Art
                </Typography>
            </Box>
        </Grid>
    )
}