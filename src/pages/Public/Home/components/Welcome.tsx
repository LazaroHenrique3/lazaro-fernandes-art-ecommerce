import { useNavigate } from 'react-router-dom'
import {
    useTheme,
    Grid,
    Typography,
    Button,
    Box
} from '@mui/material'

import me from '../../../.././images/me.jpg'

export const Welcome = () => {
    const theme = useTheme()
    const navigate = useNavigate()

    return (
        <Box component='section'>
            <Grid container display='flex' justifyContent='center' padding={5} spacing={2}>
                <Grid item display='flex' flexDirection='column' alignSelf='center' gap={2} xs={12} md={5}>
                    <Typography variant="h3" color={theme.palette.primary.light} fontWeight={800}>
                        Seja bem vindo!
                    </Typography>
                    <Typography variant="h5" fontWeight={500}>
                        Me chamo Lázaro Henrique, <br />
                        um admirador e estudante de arte nas horas vagas.
                    </Typography>
                    <Typography align='justify' variant="h6">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Quae ad est quasi alias exercitationem atque doloremque illo? Explicabo
                        labore et tempore adipisci quasi nihil sapiente necessitatibus?
                        Beatae, quam delectus! Ad.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: '200px', fontSize: '16px' }}
                        onClick={() => navigate('/about')}
                    >
                        Leia mais
                    </Button>
                </Grid>

                <Grid item xs={12} md={5} container justifyContent='center' alignItems='center'>
                    <img src={me} alt="Me" style={{ width: '100%' }} />
                </Grid>
            </Grid>
        </Box>
    )
}