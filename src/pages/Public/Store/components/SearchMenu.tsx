import React, { useState } from 'react'

import {
    useTheme,
    useMediaQuery,
    List,
    Skeleton
} from '@mui/material'


import {
    CategoryOptionSearchMenu,
    TechniqueOptionSearchMenu,
    OrderOptionSearchMenu
} from './optionsSearchMenu'

//Hooks personalizados
import { 
    UseFetchCategoryData, 
    UseFetchTechniqueData
} from '../hooks'

interface IOptionsSearchMenuProps {
    openSearchFilterMenu: boolean
    selectedCategory: string
    selectedTechnique: string
    selectedOrder: string
    setOpenSearchFilterMenu: (openSearchFilterMenu: boolean) => void
    onClickSelectCategoryFilter: (newText: string) => void
    onClickSelectTechniqueFilter: (newText: string) => void
    onClickOrderFilter: (newText: string) => void
}

export const SearchMenu: React.FC<IOptionsSearchMenuProps> = ({
    openSearchFilterMenu,
    selectedCategory,
    selectedTechnique,
    selectedOrder,
    setOpenSearchFilterMenu,
    onClickSelectCategoryFilter,
    onClickSelectTechniqueFilter,
    onClickOrderFilter,
}) => {

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const [isLoading, setIsLoading] = useState(false)

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
                            <OrderOptionSearchMenu
                                onClickSelectOrderFilter={onClickOrderFilter}
                                selectedOrder={selectedOrder}
                                setOpenSearchFilterMenu={setOpenSearchFilterMenu} />

                            <CategoryOptionSearchMenu
                                onClickSelectCategoryFilter={onClickSelectCategoryFilter}
                                selectedCategory={selectedCategory}
                                setOpenSearchFilterMenu={setOpenSearchFilterMenu}
                                categories={categories} />

                            <TechniqueOptionSearchMenu
                                onClickSelectTechniqueFilter={onClickSelectTechniqueFilter}
                                selectedTechnique={selectedTechnique}
                                setOpenSearchFilterMenu={setOpenSearchFilterMenu}
                                techniques={techniques} />
                        </List >
                    )}
                </>
            )}
        </>
    )
}

