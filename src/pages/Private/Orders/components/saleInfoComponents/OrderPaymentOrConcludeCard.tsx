import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Icon,
    Box
} from '@mui/material'

import {
    TSalePaymentMethods,
    TSaleStatus
} from '../../../../../shared/services/api/sales/SaleService'
import { TrackOrder } from '../../../../../shared/components/Modals/TrackOrder/TrackOrder'

interface IPaymentSelectCardProps {
    trackingCode?: string
    saleStatus: TSaleStatus
    paymentMethod: TSalePaymentMethods
    handlePaymentOrder: () => void
    handleConcludeOrder: () => void
}

export const OrderPaymentOrConcludeCard: React.FC<IPaymentSelectCardProps> = ({
    trackingCode,
    paymentMethod,
    saleStatus,
    handlePaymentOrder,
    handleConcludeOrder
}) => {
    return (
        <Grid container item xs={12} sm={6} lg={4} xl={3} justifyContent='center'>
            <Card sx={{ width: 270 }}>
                <CardContent sx={{ height: '90%' }}>
                    <Box height='100%' display='flex' flexDirection='column' justifyContent='space-between' gap={3}>
                        <Box>
                            <Typography variant='h6' marginBottom={3}>
                                {saleStatus}
                            </Typography>

                            {saleStatus === 'Ag. Pagamento' && paymentMethod}
                        </Box>

                        {(saleStatus === 'Ag. Pagamento') ? (
                            <Button
                                onClick={handlePaymentOrder}
                                variant='contained'
                                startIcon={<Icon>attach_money</Icon>}>
                                Pagar
                            </Button>
                        ) : (
                            <Box display="flex" flexDirection='column' gap={1}>
                                {trackingCode && (
                                    <TrackOrder trackingCode={trackingCode} />
                                )}

                                <Button
                                    fullWidth
                                    onClick={handleConcludeOrder}
                                    variant='contained'
                                    startIcon={<Icon>check_circle</Icon>}>
                                    Pedido recebido
                                </Button>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
}