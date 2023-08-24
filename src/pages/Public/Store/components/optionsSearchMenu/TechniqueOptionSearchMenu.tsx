import {
    useTheme,
    ListSubheader,
    ListItemButton,
    ListItemText,
    Box,
} from '@mui/material'

import { Scrollbars } from 'react-custom-scrollbars-2'

type TSearchOptionsList = {
    id: number
    label: string
    product_count: number
}

interface ITechniqueOptionSearchMenu {
    selectedTechnique: string
    setOpenSearchFilterMenu: (openSearchFilterMenu: boolean) => void
    onClickSelectTechniqueFilter: (newText: string) => void
    techniques: TSearchOptionsList[]
}

export const TechniqueOptionSearchMenu: React.FC<ITechniqueOptionSearchMenu> = ({
    selectedTechnique,
    setOpenSearchFilterMenu,
    onClickSelectTechniqueFilter,
    techniques
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
                Técnicas
            </ListSubheader>
            <Scrollbars
                style={{ height: '200px' }}
                renderThumbVertical={(props) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: '4px',
                            width: '6px',
                        }}
                    />
                )}
            >
                <Box >
                    <ListItemButton
                        selected={selectedTechnique === ''}
                        onClick={() => { onClickSelectTechniqueFilter(''); setOpenSearchFilterMenu(false) }}>
                        <ListItemText primary='Todas' />
                    </ListItemButton>
                    {techniques.map(technique => (
                        <ListItemButton
                            key={technique.id}
                            selected={selectedTechnique === technique.label}
                            onClick={() => { onClickSelectTechniqueFilter(technique.label); setOpenSearchFilterMenu(false) }}>
                            <ListItemText primary={`${technique.label} (${technique.product_count})`} />
                        </ListItemButton>
                    ))}
                </Box>

            </Scrollbars>
        </>
    )
}