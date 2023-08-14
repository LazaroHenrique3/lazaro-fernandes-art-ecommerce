import {
    useTheme,
    Grid,
    Typography,
    Box,
    Divider
} from '@mui/material'

import me from '../../.././images/me.jpg'

export const AboutMe = () => {
    const theme = useTheme()

    return (
        <>
            <Box component='section'>
                <Grid container display='flex' justifyContent='center' padding={5} spacing={2}>
                    <Grid item display='flex' flexDirection='column' alignSelf='center' gap={2} xs={12} md={5}>
                        <Typography variant="h3" color={theme.palette.primary.light} fontWeight={800}>
                            Sobre Lázaro
                        </Typography>
                        <Typography align='justify' variant="h6">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Quae ad est quasi alias exercitationem atque doloremque illo? Explicabo
                            labore et tempore adipisci quasi nihil sapiente necessitatibus?
                            Beatae, quam delectus! Ad.
                        </Typography>
                        <Typography align='justify' variant="h6" color={theme.palette.primary.light}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Quae ad est quasi alias exercitationem atque doloremque illo? Explicabo
                            labore et tempore adipisci quasi nihil sapiente necessitatibus?
                            Beatae, quam delectus! Ad.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={5} container justifyContent='center' alignItems='center'>
                        <img src={me} alt="Me" style={{ width: '100%' }} />
                    </Grid>
                </Grid>
            </Box>

            <Divider variant="middle" />
        </>
    )
}