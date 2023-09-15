import {
    useState,
    useEffect,
} from 'react'

import { 
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography
} from '@mui/material'

const steps = ['END. ENTREGA', 'MÉT. ENVIO', 'FORMA PAGAMENTO']

interface IStepsCompleted {
    [stepNumber: number]: boolean;
}

interface ICheckoutStepperProps {
    setSelectedStep: (step: number) => void
    stepsCompleted: IStepsCompleted
}

export const CheckoutStepper: React.FC<ICheckoutStepperProps> = ({ setSelectedStep, stepsCompleted }) => {
    const [activeStep, setActiveStep] = useState(0)
    const [skipped, setSkipped] = useState(new Set<number>())

    useEffect(() => {
        setSelectedStep(activeStep)
    }, [activeStep])

    const isStepSkipped = (step: number) => {
        return skipped.has(step)
    }

    const handleNext = () => {
        let newSkipped = skipped
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped(newSkipped)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleReset = () => {
        setActiveStep(0)
        setSelectedStep(0)
    }

    return (
        <Box sx={{ minWidth: '280px' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {}
                    const labelProps: {
                        optional?: React.ReactNode
                    } = {}
                    if (isStepSkipped(index)) {
                        stepProps.completed = false
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        Já é quase seu!
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Refazer Tudo</Button>
                    </Box>
                </>
            ) : (
                <>
                    <Typography sx={{ mt: 2, mb: 1 }}>Etapa {activeStep + 1}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            variant='outlined'
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Voltar
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button 
                            variant='contained' 
                            disabled={!stepsCompleted[activeStep]}
                            onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    )
}