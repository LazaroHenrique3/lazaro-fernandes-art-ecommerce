import React, { useState } from 'react'

import {
    useTheme,
    useMediaQuery,
    ListSubheader,
    List,
    ListItemButton,
    ListItemText,
    Skeleton
} from '@mui/material'

//Hooks personalizados
import {
    UseFetchCategoryData,
    UseFetchTechniqueData
} from '../hooks'

interface IOptionsSearchMenuProps {
    openSearchFilterMenu: boolean
    selectedCategory: string
    selectedTechnique: string
    setOpenSearchFilterMenu: (openSearchFilterMenu: boolean) => void
    onClickSelectCategoryFilter: (newText: string) => void
    onClickSelectTechniqueFilter: (newText: string) => void
}

export const OptionsSearchMenu: React.FC<IOptionsSearchMenuProps> = ({
    openSearchFilterMenu,
    selectedCategory,
    selectedTechnique,
    setOpenSearchFilterMenu,
    onClickSelectCategoryFilter,
    onClickSelectTechniqueFilter
}) => {

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const listSubheaderStyle = {
        position: 'static',
        fontWeight: 800,
        bgcolor: theme.palette.secondary.main,
        color: theme.palette.primary.light
    }

    const [isLoading, setIsLoading] = useState(false)

    //Hooks personalizados
    const { categories } = UseFetchCategoryData({ setIsLoading })
    const { techniques } = UseFetchTechniqueData({ setIsLoading })

    return (
        <>
            {(openSearchFilterMenu || !smDown) && (
                <>
                    {isLoading ? (
                        <Skeleton variant="rectangular" width={260} height={600} />
                    ) : (
                        <List
                            sx={{ width: '100%', bgcolor: 'background.paper', height: 'auto' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            <ListSubheader component="div" id="nested-list-subheader" sx={listSubheaderStyle}>
                                Categorias
                            </ListSubheader>
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
                                    <ListItemText primary={category.label} />
                                </ListItemButton>
                            ))}


                            <ListSubheader component="div" id="nested-list-subheader" sx={listSubheaderStyle}>
                                Técnicas
                            </ListSubheader>
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
                                    <ListItemText primary={technique.label} />
                                </ListItemButton>
                            ))}

                        </List >
                    )}
                </>
            )}
        </>
    )
}

