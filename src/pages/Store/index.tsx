import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
    useTheme,
    useMediaQuery,
    Box,
    Grid,
    Typography,
    Pagination,
    Skeleton,
    Paper
} from '@mui/material'

import { IListProduct } from '../../shared/services/api/product/ProductService'
import { Environment } from '../../shared/environment'

import { BasePageEcommerceLayout } from '../../shared/layouts'

import {
    ListProductsForSaleTools,
    ProductCard,
    OptionsSearchMenu
} from './components'

//Hooks personalizados
import { UseFetchProductData } from './hooks'

const container = {
    maxWidth: 1200,
    margin: '0 auto',
}

export const Store = () => {
    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const [searchParams, setSearchParams] = useSearchParams()

    const [products, setProducts] = useState<IListProduct[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    //Fazer a pesquisa do input de pesquisa através da URL
    //Toda vez que for digitado um texto será mudado o searchParams da Url
    //Logo o valor vai ser modificado, o que por sua vez executa o useMemo
    //E por fim esse valor será armazenado em 'search'

    const search = useMemo(() => {
        //Pega o parâmetro na URL
        return searchParams.get('search') || ''
    }, [searchParams])

    const page = useMemo(() => {
        //Pega o parâmetro na URL
        return Number(searchParams.get('page') || '1')
    }, [searchParams])

    const category = useMemo(() => {
        //Pega o parâmetro na URL
        return searchParams.get('category') || ''
    }, [searchParams])

    const technique = useMemo(() => {
        //Pega o parâmetro na URL
        return searchParams.get('technique') || ''
    }, [searchParams])

    const order = useMemo(() => {
        //Pega o parâmetro na URL
        return searchParams.get('order') || ''
    }, [searchParams])

    //Buscando os produtos
    UseFetchProductData({ setIsLoading, setProducts, setTotalCount, search, category, technique, order, page })

    //Controla se o menu de filtro aparece em dispositivos menores
    const [openSearchFilterMenu, setOpenSearchFilterMenu] = useState(false)

    useEffect(() => {
        // Atualiza o estado 'openSearchFilterMenu' para 'false' quando smDown deixar de ser verdadeiro
        if (!smDown && openSearchFilterMenu) {
            setOpenSearchFilterMenu(false)
        }
    }, [smDown])

    return (
        <BasePageEcommerceLayout>
            <Box display='flex' flexDirection='column' alignItems='center' sx={container} component='section'>
                <Typography variant='h2' marginTop={5} marginBottom={10} color={theme.palette.primary.light} fontWeight={800}>
                    Loja
                </Typography>

                <ListProductsForSaleTools
                    onChangeSearchText={text => setSearchParams({ search: text, category: category, technique: technique, order: order, page: '1' }, { replace: true })}
                    searchText={search}
                    showFilterButton={smDown}
                    onClickFilterButton={setOpenSearchFilterMenu}
                    openSearchFilterMenu={openSearchFilterMenu} />

                <Grid container marginBottom={10} spacing={4} alignItems='stretch'>
                    <Grid container item xs={12} sm={3} md={3}>
                        <OptionsSearchMenu
                            selectedCategory={category}
                            selectedTechnique={technique}
                            selectedOrder={order}
                            openSearchFilterMenu={openSearchFilterMenu}
                            setOpenSearchFilterMenu={setOpenSearchFilterMenu}
                            onClickSelectCategoryFilter={text => setSearchParams({ search: search, category: text, technique: technique, order: order, page: '1' }, { replace: true })}
                            onClickSelectTechniqueFilter={text => setSearchParams({ search: search, category: category, technique: text, order: order, page: '1' }, { replace: true })}
                            onClickOrderFilter={text => setSearchParams({ search: search, category: category, technique: technique, order: text, page: '1' }, { replace: true })}
                        />
                    </Grid>

                    <Grid container spacing={4} item xs={12} sm={9} md={9}>

                        {isLoading ? (
                            <>
                                <Grid container item xs={12} sm={6} md={4} justifyContent='center'>
                                    <Skeleton variant="rectangular" width={260} height={400} />
                                </Grid>

                                <Grid container item xs={12} sm={6} md={4} justifyContent='center'>
                                    <Skeleton variant="rectangular" width={260} height={400} />
                                </Grid>

                                <Grid container item xs={12} sm={6} md={4} justifyContent='center'>
                                    <Skeleton variant="rectangular" width={260} height={400} />
                                </Grid>
                            </>
                        ) : (
                            <>
                                {(totalCount === 0 && !isLoading) ? (
                                    <Box width='100%' height='40px' marginLeft={1} marginTop={5} component={Paper}>
                                        <Typography variant='h6' textAlign='center'>{Environment.EMPTY_LISTING}</Typography>
                                    </Box>
                                ) : (
                                    <>
                                        {products.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                id={product.id}
                                                title={product.title}
                                                status={product.status}
                                                image={product.main_image}
                                                price={product.price} />
                                        ))}
                                    </>
                                )}
                            </>
                        )}

                        {(totalCount > 0 && totalCount > Environment.LINE_LIMIT) && (
                            <Box width='100%' display='flex' justifyContent='center' marginTop={5}>
                                <Pagination
                                    page={page}
                                    count={Math.ceil(totalCount / Environment.LINE_LIMIT)}
                                    onChange={(e, newPage) => setSearchParams({ search, page: newPage.toString() }, { replace: true })}
                                />
                            </Box>
                        )}

                    </Grid>
                </Grid>
            </Box>
        </BasePageEcommerceLayout>
    )
}