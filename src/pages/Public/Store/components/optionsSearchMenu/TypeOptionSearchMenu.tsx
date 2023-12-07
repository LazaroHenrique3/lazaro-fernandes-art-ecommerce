import {
    useTheme,
    ListSubheader,
    ListItemButton,
    ListItemText,
} from '@mui/material'

interface ITypeOptionSearchMenu {
    selectedType: string
    setOpenSearchFilterMenu: (openSearchFilterMenu: boolean) => void
    onClickSelectTypeFilter: (newText: string) => void
}

export const TypeOptionSearchMenu: React.FC<ITypeOptionSearchMenu> = ({
    selectedType,
    setOpenSearchFilterMenu,
    onClickSelectTypeFilter,
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
                Tipos
            </ListSubheader>
            <ListItemButton
                selected={selectedType === ''}
                onClick={() => { onClickSelectTypeFilter(''); setOpenSearchFilterMenu(false) }}>
                <ListItemText primary='Todos' />
            </ListItemButton>
            <ListItemButton
                selected={(selectedType === 'Original')}
                onClick={() => { onClickSelectTypeFilter('Original'); setOpenSearchFilterMenu(false) }}>
                <ListItemText primary='Originais' />
            </ListItemButton>
            <ListItemButton
                selected={selectedType === 'Print'}
                onClick={() => { onClickSelectTypeFilter('Print'); setOpenSearchFilterMenu(false) }}>
                <ListItemText primary='Prints' />
            </ListItemButton>
        </>
    )
}