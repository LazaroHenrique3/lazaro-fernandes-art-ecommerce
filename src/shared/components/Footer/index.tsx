import { Box, Paper, Link, Typography } from '@mui/material'

import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

export const Footer = () => {

    return (
        <Box component='footer'>
            <Box component={Paper} sx={{ padding: 3 }} >
                <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
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
            </Box>
        </Box>
    )
}