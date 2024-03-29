import {
    Grid,
    Typography,
    Skeleton
} from '@mui/material'

import {
    TSalePaymentMethods,
    TSaleStatus
} from '../../../../shared/services/api/sales/SaleService'

import {
    IListAddress
} from '../../../../shared/services/api/address/AddressService'

import {
    DeliveryAddressCard,
    OrderPaymentOrConcludeCard,
} from './saleInfoComponents'
import { FormHandles } from '@unform/core'

interface ISaleInfoSection {
    formRef: React.RefObject<FormHandles>
    isLoading: boolean
    idSale: number
    saleStatus: TSaleStatus,
    saleAddress: IListAddress,
    paymentMethod: TSalePaymentMethods,
    trackingCode?: string,
    setSaleAddress: (address: IListAddress) => void
    handlePaySale: (idSale: number) => void
    handleConcludeSale: (idSale: number) => void
}

export const SaleInfoSection: React.FC<ISaleInfoSection> = ({
    formRef,
    isLoading,
    idSale,
    saleStatus,
    saleAddress,
    paymentMethod,
    trackingCode,
    setSaleAddress,
    handlePaySale,
    handleConcludeSale
}) => {

    return (
        <Grid container padding={2} spacing={2}>
            <Grid container item xl={12}>
                <Typography variant='h6'>Informações do pedido</Typography>
            </Grid>

            {(isLoading || saleAddress.id === undefined) ? (
                <>
                    <Grid container item xs={12} sm={6} lg={4} xl={3}>
                        <Skeleton variant="rectangular" width={300} height={200} />
                    </Grid>

                    <Grid container item xs={12} sm={6} lg={4} xl={3}>
                        <Skeleton variant="rectangular" width={300} height={200} />
                    </Grid>
                </>
            ) : (
                <>
                    <DeliveryAddressCard
                        formRef={formRef}
                        statusSale={saleStatus}
                        idSale={idSale}
                        idAddress={saleAddress.id}
                        cep={saleAddress.cep}
                        city={saleAddress.city}
                        state={saleAddress.state}
                        neighborhood={saleAddress.neighborhood}
                        number={String(saleAddress.number)}
                        street={saleAddress.street}
                        complement={saleAddress.complement}
                        setSaleAddress={setSaleAddress}
                    />

                    {(saleStatus === 'Ag. Pagamento' || saleStatus === 'Enviado') &&
                        <OrderPaymentOrConcludeCard
                            trackingCode={trackingCode}
                            handlePaymentOrder={() => handlePaySale(idSale)}
                            handleConcludeOrder={() => handleConcludeSale(idSale)}
                            paymentMethod={paymentMethod}
                            saleStatus={saleStatus}
                        />
                    }
                </>
            )}

        </Grid>
    )
}