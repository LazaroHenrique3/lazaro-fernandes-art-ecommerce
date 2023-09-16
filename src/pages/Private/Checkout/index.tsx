import {
    useState,
    useEffect
} from 'react'

import {
    useNavigate
} from 'react-router-dom'

import {
    Box,
    CircularProgress
} from '@mui/material'

import { BasePagePrivateLayout } from '../../../shared/layouts'
import { useCartContext } from '../../../shared/contexts'

import {
    CheckoutStepper,
    AddressSelect,
    OrderResume,
    PaymentMethod,
    ShippingMethod
} from './components'

import {
    TSalePaymentMethods,
    TSaleShippingMethods
} from '../../../shared/services/api/sales/SaleService'

//Hooks peronalizados
import {
    UseHandleSale
} from './hooks'

interface ISelectAddressFunctionProps {
    idAddress: string
    selectedAddressCep: string
}

export const Checkout = () => {
    const { productsInCart } = useCartContext()

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [selectedStep, setSelectedStep] = useState(0)

    const [selectedAddress, setSelectedAddress] = useState<ISelectAddressFunctionProps>({ idAddress: '', selectedAddressCep: '' })
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<TSalePaymentMethods>('PIX')
    const [selectedShippingMethod, setSelectedShippingMethod] = useState<TSaleShippingMethods>('PAC')
    const [selectedShippingPrice, setSelectedShippingPrice] = useState(0)
    const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('')

    const { handleSave } = UseHandleSale({ setIsLoading })

    const stepsCompleted = {
        0: selectedAddress.idAddress !== '',
        1: !!selectedShippingMethod,
        2: !!selectedPaymentMethod
    }

    useEffect(() => {
        (productsInCart.length === 0) ? navigate('/store') : ''
    }, [])

    const AddressSelectWrapper = () => (
        <AddressSelect
            selectedAddress={selectedAddress.idAddress}
            setAddress={setSelectedAddress} />
    )

    const ShippingMethodWrapper = () => (
        <ShippingMethod
            selectedShippingMethod={selectedShippingMethod}
            setShippingMethod={setSelectedShippingMethod}
            setSelectedShippingPrice={setSelectedShippingPrice}
            setEstimatedDeliveryDate={setEstimatedDeliveryDate}
            selectedShippingCep={selectedAddress.selectedAddressCep} />
    )

    const PaymentMethodWrapper = () => (
        <PaymentMethod
            selectedPaymentMethod={selectedPaymentMethod}
            setPaymentMethod={setSelectedPaymentMethod} />
    )

    const OrderResumeWrapper = () => (
        <OrderResume
            selectedShippingPrice={selectedShippingPrice}
            selectedShippingMethod={selectedShippingMethod}

            handleCompletePurchase={() => handleSave(
                Number(selectedAddress.idAddress),
                selectedPaymentMethod,
                selectedShippingMethod,
                estimatedDeliveryDate,
                selectedShippingPrice)
            } />
    )

    const contentMappings: {
        [key: number]: () => JSX.Element;
    } = {
        0: AddressSelectWrapper,
        1: ShippingMethodWrapper,
        2: PaymentMethodWrapper,
        3: OrderResumeWrapper,
    }

    const ContentToRender = contentMappings[selectedStep] || AddressSelectWrapper

    return (
        <BasePagePrivateLayout title={'Finalizar Compra'}>
            {(isLoading) ?
                <Box width='100%' display='flex' justifyContent='center'>
                    <CircularProgress />
                </Box>
                :
                <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
                    <Box minWidth='280px' maxWidth='600px' >
                        <CheckoutStepper
                            setSelectedStep={setSelectedStep}
                            stepsCompleted={stepsCompleted} />
                    </Box>

                    <ContentToRender />
                </Box>
            }
        </BasePagePrivateLayout>
    )
}

