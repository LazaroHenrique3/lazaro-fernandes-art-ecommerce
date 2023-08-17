import {
    useTheme,
    ListSubheader,
    ListItemButton,
    ListItemText,
} from '@mui/material'

interface IOrderOptionSearchMenu {
    selectedOrder: string
    setOpenSearchFilterMenu: (openSearchFilterMenu: boolean) => void
    onClickSelectOrderFilter: (newText: string) => void
}

export const OrderOptionSearchMenu: React.FC<IOrderOptionSearchMenu> = ({
    selectedOrder,
    setOpenSearchFilterMenu,
    onClickSelectOrderFilter,
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
                Ordenar
            </ListSubheader>
            <ListItemButton
                selected={(selectedOrder === 'ASC' || selectedOrder === '')}
                onClick={() => { onClickSelectOrderFilter('ASC'); setOpenSearchFilterMenu(false) }}>
                <ListItemText primary='Menor preço' />
            </ListItemButton>
            <ListItemButton
                selected={selectedOrder === 'DESC'}
                onClick={() => { onClickSelectOrderFilter('DESC'); setOpenSearchFilterMenu(false) }}>
                <ListItemText primary='Maior preço' />
            </ListItemButton>
        </>
    )
}