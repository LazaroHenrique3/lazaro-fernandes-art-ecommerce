import { useState } from 'react'

import {
    Box
} from '@mui/material'

import { BasePagePrivateLayout } from '../../../shared/layouts'
import {
    CheckoutStepper,
    AddressSelect,
    OrderResume,
    PaymentMethod,
    ShippingMethod
} from './components'

export const Checkout = () => {
    const [selectedStep, setSelectedStep] = useState(0)

    const [selectedAddress, setSelectedAddress] = useState('')
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('PIX')
    const [selectedShippingMethod, setSelectedShippingMethod] = useState('PAC')

    const AddressSelectWrapper = () => (
        <AddressSelect selectedAddress={selectedAddress} setAddress={setSelectedAddress} />
    )
    
    const ShippingMethodWrapper = () => (
        <ShippingMethod selectedShippingMethod={selectedShippingMethod} setShippingMethod={setSelectedShippingMethod} />
    )

    const PaymentMethodWrapper = () => (
        <PaymentMethod selectedPaymentMethod={selectedPaymentMethod} setPaymentMethod={setSelectedPaymentMethod} />
    )
    

    let ContentToRender: () => JSX.Element

    switch (selectedStep) {
    case 0:
        ContentToRender = AddressSelectWrapper
        break

    case 1:
        ContentToRender = ShippingMethodWrapper
        break

    case 2:
        ContentToRender = PaymentMethodWrapper
        break

    case 3:
        ContentToRender = OrderResume
        break

    default:
        ContentToRender = AddressSelectWrapper
    }

    return (
        <BasePagePrivateLayout title={'Finalizar Compra'}>
            <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
                <Box minWidth='280px' maxWidth='600px' >
                    <CheckoutStepper setSelectedStep={setSelectedStep} />
                </Box>

                <ContentToRender />
            </Box>
        </BasePagePrivateLayout>
    )
}

