import {
    useTheme,
    ListSubheader,
    ListItemButton,
    ListItemText,
} from '@mui/material'

interface IStatusOptionSearchMenu {
    selectedStatus: string
    setOpenSearchFilterMenu: (openSearchFilterMenu: boolean) => void
    onClickSelectStatusFilter: (newText: string) => void
}

export const StatusOptionSearchMenu: React.FC<IStatusOptionSearchMenu> = ({
    selectedStatus,
    setOpenSearchFilterMenu,
    onClickSelectStatusFilter,
}) => {
    const theme = useTheme()

    const listSubheaderStyle = {
        position: 'static',
        fontWeight: 800,
        bgcolor: theme.palette.secondary.main,
        color: theme.palette.primary.light
    }

    return (
        <>
            <ListSubheader component="div" id="nested-list-subheader" sx={listSubheaderStyle}>
                Status
            </ListSubheader>
            <ListItemButton
                selected={selectedStatus === ''}
                onClick={() => { onClickSelectStatusFilter(''); setOpenSearchFilterMenu(false) }}>
                <ListItemText primary='Todos' />
            </ListItemButton>
            <ListItemButton
                selected={selectedStatus === 'Ativo'}
                onClick={() => { onClickSelectStatusFilter('Ativo'); setOpenSearchFilterMenu(false) }}>
                <ListItemText primary='Disponíveis' />
            </ListItemButton>
            <ListItemButton
                selected={selectedStatus === 'Vendido'}
                onClick={() => { onClickSelectStatusFilter('Vendido'); setOpenSearchFilterMenu(false) }}>
                <ListItemText primary='Vendidos' />
            </ListItemButton>
        </>
    )
}