import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import {
    Box,
    Grid,
    LinearProgress,
    Paper,
    Typography,
} from '@mui/material'

import {
    ISaleItemsList,
    TSalePaymentMethods,
    TSaleStatus
} from '../../../shared/services/api/sales/SaleService'

import {
    IListAddress
} from '../../../shared/services/api/address/AddressService'

import {
    TableSaleItems,
    SaleInfoSection
} from './components'

import { BasePagePrivateLayout } from '../../../shared/layouts'
import { DetailTools } from '../../../shared/components'
import {
    VTextField,
    VForm,
    useVForm,
} from '../../../shared/forms'

//Hooks personalizados
import {
    UseFetchSaleData,
    UseHandleSale
} from './hooks/detailsHooks'

export const SaleDetails: React.FC = () => {
    const { id = '' } = useParams<'id'>()
    const navigate = useNavigate()

    const { formRef } = useVForm('formRef')

    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')

    const [paymentMethod, setPaymentMethod] = useState<TSalePaymentMethods>('' as TSalePaymentMethods)
    const [saleStatus, setSaleStatus] = useState<TSaleStatus>('' as TSaleStatus)

    const [salesItems, setSaleItems] = useState<ISaleItemsList[]>([])
    const [saleAddress, setSaleAddress] = useState<IListAddress>({} as IListAddress)

    //Hooks personalizados
    UseFetchSaleData({ setIsLoading, setSaleItems, setSaleAddress, setPaymentMethod, setSaleStatus, setName, formRef, id })
    const { handlePaySale, handleConcludeSale } = UseHandleSale({ formRef, setSaleStatus, setIsLoading })

    return (
        <BasePagePrivateLayout
            title={`'${name}'`}
            toolBar={
                <DetailTools
                    showSaveButton={false}
                    showNewButton={false}
                    showDeleteButton={false}

                    onClickBackButton={() => navigate('/customer/orders')}
                />
            }>

            <VForm ref={formRef} onSubmit={() => console.log('')}>
                <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>

                    <Grid container direction='column' padding={2} spacing={2}>
                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant='indeterminate' />
                            </Grid>
                        )}

                        <Grid item>
                            <Typography variant='h6'>Detalhes do Pedido</Typography>
                        </Grid>

                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <VTextField fullWidth label='Status 🚫' name='status' InputProps={{ readOnly: true }} disabled={isLoading} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <VTextField fullWidth label='Data do pedido 🚫' name='order_date' InputProps={{ readOnly: true }} disabled={isLoading} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <VTextField fullWidth label='Previsão de entrega 🚫' name='estimated_delivery_date' InputProps={{ readOnly: true }} disabled={isLoading} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <VTextField fullWidth label='Vencimento 🚫' name='payment_due_date' InputProps={{ readOnly: true }} disabled={isLoading} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <VTextField fullWidth label='Forma de pagamento 🚫' name='payment_method' InputProps={{ readOnly: true }} disabled={isLoading} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <VTextField fullWidth label='Forma de envio 🚫' name='shipping_method' InputProps={{ readOnly: true }} disabled={isLoading} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <VTextField fullWidth label='Data de recebimento 🚫' name='payment_received_date' InputProps={{ readOnly: true }} disabled={isLoading} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <VTextField fullWidth label='Data de entrega 🚫' name='delivery_date' InputProps={{ readOnly: true }} disabled={isLoading} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <VTextField fullWidth label='Código de rastreio 🚫' name='tracking_code' InputProps={{ readOnly: true }} disabled={isLoading} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <VTextField fullWidth label='Valor do frete 🚫' name='shipping_cost' InputProps={{ readOnly: true }} disabled={isLoading} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <VTextField fullWidth label='Subtotal 🚫' name='subtotal' InputProps={{ readOnly: true }} disabled={isLoading} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <VTextField fullWidth label='Total 🚫' name='total' InputProps={{ readOnly: true }} disabled={isLoading} />
                            </Grid>
                        </Grid>

                    </Grid>
                </Box>
            </VForm>

            <TableSaleItems 
                isLoading={isLoading} 
                salesItemsList={salesItems}/>

            <SaleInfoSection
                isLoading={isLoading}
                idSale={Number(id)}
                saleStatus={saleStatus}
                paymentMethod={paymentMethod}
                saleAddress={saleAddress}
                handlePaySale={handlePaySale}
                handleConcludeSale={handleConcludeSale}
            />

        </BasePagePrivateLayout>
    )
}