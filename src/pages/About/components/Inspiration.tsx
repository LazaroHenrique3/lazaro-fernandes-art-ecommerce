import {
    useTheme,
    Grid,
    Hidden,
    Typography,
    Box,
    Divider
} from '@mui/material'

import lightOfRope from '../../.././images/products/4.png'

export const Inspiration = () => {
    const theme = useTheme()

    return (
        <>
            <Box component='section'>
                <Grid container display='flex' justifyContent='center' padding={5} spacing={2}>
                    <Grid item xs={12} md={5} container justifyContent='center' alignItems='center'>
                        <Hidden smDown>
                            <img src={lightOfRope} alt="Me" style={{ width: '100%' }} />
                        </Hidden>
                    </Grid>

                    <Grid item display='flex' flexDirection='column' alignSelf='center' gap={2} xs={12} md={5}>
                        <Typography variant="h3" color={theme.palette.primary.light} fontWeight={800}>
                            Inspirações e estilos
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
                        <Hidden mdUp>
                            <img src={lightOfRope} alt="Me" style={{ width: '100%' }} />
                        </Hidden>
                    </Grid>
                </Grid>
            </Box>

            <Divider variant="middle" />
        </>
    )
}