import {
    useTheme,
    Typography,
    Box
} from '@mui/material'

interface IInfoSection {
    title: string
    children: React.ReactNode
}

export const InfoSection: React.FC<IInfoSection> = ({ title, children }) => {
    const theme = useTheme()

    return (
        <Box>
            <Typography variant='h5' color={theme.palette.primary.light} fontWeight={600}>
                {title}
            </Typography>
            {children}
        </Box>
    )
}