import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from '@mui/material'

interface IShippingMethodProps {
    setShippingMethod: (shippingMethod: string) => void
    selectedShippingMethod: string
}

export const ShippingMethod: React.FC<IShippingMethodProps> = ({ setShippingMethod, selectedShippingMethod }) => {

    return (
        <Box width='100%' marginY={3}>
            <Box width='100%' marginBottom={2} gap={1} display='flex' justifyContent='space-between'>
                <Box marginLeft={5}>
                    <Typography variant='h6'>Selecione</Typography>
                </Box>
            </Box>

            <Grid container spacing={1} paddingX={5} justifyContent='center'>
                <Grid container item xs={12} sm={6} lg={4} xl={3} justifyContent='center'>
                    <Card sx={{ width: 260 }}>
                        <CardContent>

                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Forma de envio</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={selectedShippingMethod }
                                    onChange={(e) => setShippingMethod(e.target.value)}
                                >
                                    <FormControlLabel value="PAC" control={<Radio />} label="PAC" />
                                    <FormControlLabel value="SEDEX" control={<Radio />} label="SEDEX" />
                                </RadioGroup>
                            </FormControl>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

