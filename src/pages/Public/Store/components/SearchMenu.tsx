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
    OrderOptionSearchMenu,
    TypeOptionSearchMenu
} from './optionsSearchMenu'

//Hooks personalizados
import {
    UseFetchCategoryData,
    UseFetchTechniqueData
} from '../hooks'
import { StatusOptionSearchMenu } from './optionsSearchMenu/StatusOptionSearchMenu'

interface IOptionsSearchMenuProps {
    openSearchFilterMenu: boolean
    selectedCategory: string
    selectedTechnique: string
    selectedOrder: string
    selectedStatus: string,
    selectedType: string
    setOpenSearchFilterMenu: (openSearchFilterMenu: boolean) => void
    onClickSelectCategoryFilter: (newText: string) => void
    onClickSelectTechniqueFilter: (newText: string) => void
    onClickOrderFilter: (newText: string) => void
    onClickSelectStatusFilter: (newText: string) => void
    onClickTypeFilter: (newText: string) => void
}

export const SearchMenu: React.FC<IOptionsSearchMenuProps> = ({
    openSearchFilterMenu,
    selectedCategory,
    selectedTechnique,
    selectedOrder,
    selectedStatus,
    selectedType,
    setOpenSearchFilterMenu,
    onClickSelectCategoryFilter,
    onClickSelectTechniqueFilter,
    onClickOrderFilter,
    onClickSelectStatusFilter,
    onClickTypeFilter,
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

                            <StatusOptionSearchMenu
                                onClickSelectStatusFilter={onClickSelectStatusFilter}
                                selectedStatus={selectedStatus}
                                setOpenSearchFilterMenu={setOpenSearchFilterMenu} />

                            <TypeOptionSearchMenu
                                onClickSelectTypeFilter={onClickTypeFilter}
                                selectedType={selectedType}
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

