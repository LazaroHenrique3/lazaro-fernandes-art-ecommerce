import {
    useTheme,
    ListSubheader,
    ListItemButton,
    ListItemText,
    Box,
} from '@mui/material'

type TSearchOptionsList = {
    id: number
    label: string
    product_count: number
}

interface ICategoryOptionSearchMenu {
    selectedCategory: string
    setOpenSearchFilterMenu: (openSearchFilterMenu: boolean) => void
    onClickSelectCategoryFilter: (newText: string) => void
    categories: TSearchOptionsList[]
}

export const CategoryOptionSearchMenu: React.FC<ICategoryOptionSearchMenu> = ({
    selectedCategory,
    setOpenSearchFilterMenu,
    onClickSelectCategoryFilter,
    categories
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
                Categorias
            </ListSubheader>
            <Box maxHeight='400px' sx={{ overflowY: categories.length > 7 ? 'scroll' : 'visible' }}>
                <ListItemButton
                    selected={selectedCategory === ''}
                    onClick={() => { onClickSelectCategoryFilter(''); setOpenSearchFilterMenu(false) }}>
                    <ListItemText primary='Todas' />
                </ListItemButton>
                {categories.map(category => (
                    <ListItemButton
                        key={category.id}
                        selected={selectedCategory === category.label}
                        onClick={() => { onClickSelectCategoryFilter(category.label); setOpenSearchFilterMenu(false) }}>
                        <ListItemText primary={`${category.label} (${category.product_count})`} />
                    </ListItemButton>
                ))}
            </Box>
        </>
    )
}