import {
    useState,
    useEffect
} from 'react'

import {
    useTheme,
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
    CircularProgress
} from '@mui/material'

import { formattedPrice } from '../../../../shared/util'

//hooks personalizados
import {
    UseCalculateShipping
} from '../hooks'

import { 
    TSaleShippingMethods
} from '../../../../shared/services/api/sales/SaleService'

interface IShippingInformationLine {
    label: string,
    value: number | string
}

const ShippingInformationLine = ({ label, value }: IShippingInformationLine) => {
    const theme = useTheme()

    return (
        <Box display='flex' justifyContent='space-between'>
            <Typography variant='h6' color={theme.palette.primary.light} fontSize='19px' fontWeight={800}>
                {label}:
            </Typography>

            <Typography variant='h6' marginLeft={1} fontSize='19px' fontWeight={400}>
                {(typeof value === 'string') ? value : formattedPrice(value)}
            </Typography>
        </Box>
    )
}

interface IShippingMethodProps {
    setShippingMethod: (shippingMethod: TSaleShippingMethods) => void
    setSelectedShippingPrice: (price: number) => void
    setEstimatedDeliveryDate: (date: string) => void
    selectedShippingMethod: TSaleShippingMethods
    selectedShippingCep: string
}

export const ShippingMethod: React.FC<IShippingMethodProps> = ({
    setShippingMethod,
    setSelectedShippingPrice,
    setEstimatedDeliveryDate,
    selectedShippingMethod,
    selectedShippingCep
}) => {

    const [isLoading, setIsLoading] = useState(false)
    const { calculateShipping } = UseCalculateShipping({ setIsLoading })

    const [infoShippingPac, setInfoShippingPac] = useState({ price: '0', deadline: '' })
    const [infoShippingSedex, setInfoShippingSedex] = useState({ price: '0', deadline: '' })

    useEffect(() => {

        const fetchData = async () => {
            const result = await calculateShipping(selectedShippingCep)

            if (result) {
                // PAC
                const ExpectedDeliveryTimePac = new Date()
                ExpectedDeliveryTimePac.setDate(ExpectedDeliveryTimePac.getDate() + Number(result[0].PrazoEntrega))
                const formattedDeadlinePac = formatDate(ExpectedDeliveryTimePac)

                const shippingPricePac = result[0].Valor.replace(',', '.')

                // SEDEX
                const ExpectedDeliveryTimeSedex = new Date()
                ExpectedDeliveryTimeSedex.setDate(ExpectedDeliveryTimeSedex.getDate() + Number(result[1].PrazoEntrega))
                const formattedDeadlineSedex = formatDate(ExpectedDeliveryTimeSedex)

                const shippingPriceSedex = result[1].Valor.replace(',', '.')

                setInfoShippingPac({ price: shippingPricePac, deadline: formattedDeadlinePac })
                setInfoShippingSedex({ price: shippingPriceSedex, deadline: formattedDeadlineSedex })

                if (selectedShippingMethod === 'PAC') {
                    setSelectedShippingPrice(Number(shippingPricePac))
                    setEstimatedDeliveryDate(formattedDeadlinePac)
                }
            }

        }

        fetchData()

    }, [selectedShippingCep])

    const handleChangeShippingMethod = (method: TSaleShippingMethods) => {
        const shippingMethod = method
        const shippingValue = (method === 'PAC') ? Number(infoShippingPac.price) : Number(infoShippingSedex.price)
        const estimatedDeliveryDate = (method === 'PAC') ? showFormattedDataString(infoShippingPac.deadline, 'en') : showFormattedDataString(infoShippingSedex.deadline, 'en')

        setShippingMethod(shippingMethod)
        setSelectedShippingPrice(shippingValue)
        setEstimatedDeliveryDate(estimatedDeliveryDate)
    }

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
                                    value={selectedShippingMethod}
                                    onChange={(e) => handleChangeShippingMethod(e.target.value as TSaleShippingMethods)}
                                >
                                    <FormControlLabel value="PAC" control={<Radio />} label="PAC" />
                                    <FormControlLabel value="SEDEX" control={<Radio />} label="SEDEX" />
                                </RadioGroup>
                            </FormControl>

                            <Box display='flex' justifyContent='center'>
                                {isLoading ? (
                                    <CircularProgress variant='indeterminate' />
                                ) : (
                                    <Box display='flex' flexDirection='column'>
                                        <ShippingInformationLine
                                            label={'Valor'}
                                            value={(selectedShippingMethod === 'PAC') ?
                                                Number(infoShippingPac.price) :
                                                Number(infoShippingSedex.price)} />

                                        <ShippingInformationLine
                                            label={'Entrega'}
                                            value={(selectedShippingMethod === 'PAC') ?
                                                showFormattedDataString(infoShippingPac.deadline) :
                                                showFormattedDataString(infoShippingSedex.deadline)} />
                                    </Box>
                                )}
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}

function showFormattedDataString(date: string, typeFormatation: 'pt' | 'en' = 'pt'): string {
    const parts = date.split('-')
    if (parts.length !== 3) {
        return 'Data inválida'
    }

    const [year, month, day] = parts

    return (typeFormatation === 'pt') ? `${day}/${month}/${year}` : `${year}-${month}-${day}`
}
