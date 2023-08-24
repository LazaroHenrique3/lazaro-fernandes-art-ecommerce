import {
    Typography
} from '@mui/material'

interface IInfoItem {
    label: string 
    value: string
}

export const InfoItem: React.FC<IInfoItem> = ({ label, value }) => (
    <Typography variant='h6' fontSize={18}>
        <strong>{label}: </strong> {value}
    </Typography>
)