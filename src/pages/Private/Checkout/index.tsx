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
    UseCalculateShipping,
    UseHandleSale
} from './hooks'
import { formattedDateUS } from '../../../shared/util'

interface ISelectAddressFunctionProps {
    idAddress: string
    selectedAddressCep: string
}

export const Checkout = () => {
    const { productsInCart } = useCartContext()

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [calculateShippingLoading, setCalculateShippingLoading] = useState(false)

    const [selectedStep, setSelectedStep] = useState(0)
    const { calculateShipping } = UseCalculateShipping({ setCalculateShippingLoading })

    const [infoShippingPac, setInfoShippingPac] = useState({ price: '0', deadline: '' })
    const [infoShippingSedex, setInfoShippingSedex] = useState({ price: '0', deadline: '' })
    

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

    useEffect(() => {

        const fetchData = async () => {
            if (!selectedAddress.selectedAddressCep || selectedAddress.selectedAddressCep === '') return
            const result = await calculateShipping(selectedAddress.selectedAddressCep)

            if (result) {

                // PAC
                const ExpectedDeliveryTimePac = new Date()
                ExpectedDeliveryTimePac.setDate(ExpectedDeliveryTimePac.getDate() + Number(result.prazopac))
                const formattedDeadlinePac = formattedDateUS(ExpectedDeliveryTimePac)

                const shippingPricePac = result.valorpac.replace(',', '.')

                // SEDEX
                const ExpectedDeliveryTimeSedex = new Date()
                ExpectedDeliveryTimeSedex.setDate(ExpectedDeliveryTimeSedex.getDate() + Number(result.prazosedex))
                const formattedDeadlineSedex = formattedDateUS(ExpectedDeliveryTimeSedex)

                const shippingPriceSedex = result.valorsedex.replace(',', '.')

                setInfoShippingPac({ price: shippingPricePac, deadline: formattedDeadlinePac})
                setInfoShippingSedex({ price: shippingPriceSedex, deadline: formattedDeadlineSedex})

                if (selectedShippingMethod === 'PAC') {
                    setSelectedShippingPrice(Number(shippingPricePac))
                    setEstimatedDeliveryDate(formattedDeadlinePac)
                }
            }

        }

        fetchData()

    }, [selectedAddress])

    const AddressSelectWrapper = () => (
        <AddressSelect
            selectedAddress={selectedAddress.idAddress}
            setAddress={setSelectedAddress} />
    )

    const ShippingMethodWrapper = () => (
        <ShippingMethod
            isLoading={calculateShippingLoading}
            selectedShippingMethod={selectedShippingMethod}
            infoShippingPac={infoShippingPac}
            infoShippingSedex={infoShippingSedex}
            setShippingMethod={setSelectedShippingMethod}
            setSelectedShippingPrice={setSelectedShippingPrice}
            setEstimatedDeliveryDate={setEstimatedDeliveryDate} />
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

