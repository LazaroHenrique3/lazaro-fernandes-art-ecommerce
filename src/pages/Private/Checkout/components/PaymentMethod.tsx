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

import { 
    TSalePaymentMethods 
} from '../../../../shared/services/api/sales/SaleService'


interface IPaymentMethodProps {
    setPaymentMethod: (paymentMethoD: TSalePaymentMethods) => void
    selectedPaymentMethod: string
}

export const PaymentMethod: React.FC<IPaymentMethodProps> = ({ setPaymentMethod, selectedPaymentMethod  }) => {
    
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
                                <FormLabel id="demo-controlled-radio-buttons-group">Forma de pagamento</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={selectedPaymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value as TSalePaymentMethods)}
                                >
                                    <FormControlLabel value="PIX" control={<Radio />} label="PIX" />
                                    <FormControlLabel value="BOLETO" control={<Radio />} label="BOLETO" />
                                    <FormControlLabel value="C. CREDITO" control={<Radio />} label="C. CRÉDITO" />
                                    <FormControlLabel value="C. DEBITO" control={<Radio />} label="C. DÉBITO" />
                                </RadioGroup>
                            </FormControl>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

