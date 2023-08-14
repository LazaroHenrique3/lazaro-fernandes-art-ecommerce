import { useState } from 'react'

import {
    useTheme,
    Box,
    Typography,
    Grid
} from '@mui/material'

import { BasePageEcommerceLayout } from '../../shared/layouts'

import { 
    ContactForm, 
    LocalizationInfo 
} from './components'

export const Contact = () => {
    const theme = useTheme()

    const [isLoading, setIsLoading] = useState(false)

    return (
        <BasePageEcommerceLayout>
            <Box display='flex' flexDirection='column' alignItems='center' component='section'>
                <Typography variant='h2' marginTop={5} marginBottom={10} color={theme.palette.primary.light} fontWeight={800}>
                    Contato
                </Typography>

                <Grid container paddingX={10} justifyContent='center' alignItems='stretch'>

                    <LocalizationInfo/>
                    <ContactForm isLoading={isLoading} setLoading={setIsLoading}/>

                </Grid>
            </Box>
        </BasePageEcommerceLayout>
    )
}